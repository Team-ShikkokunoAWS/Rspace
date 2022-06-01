# coding: utf-8
require 'securerandom'
require 'digest/md5'

ALL_USERS_LIMIT = 50

class Api::V1::UsersController < ApplicationController
  def auth
    user = User.find_by(name: user_params[:name])

    if user
      if user[:password] == encryption_password(user_params[:password])
        render status: 200, json: {status: 'SUCCESS', user: user}
      else
        render status: 400, json: {status: 'ERROR', errorDetail: 'passwordError'}
      end
    else
      render status: 400, json: {status: 'ERROR', errorDetail: 'nameError'}
    end
  end

  def all_users
    all_users = User.all.order(created_at: 'ASC')

    if all_users
      # いつの間にか設計が変わっていた
      if params[:nextStart] > 0
        if params[:nextStart] > all_users.count
          render status: 400, json: {status: 'ERROR', errorDetail: 'illegalNextStart'} and return
        else
          # 配列のインデックスに合わせるため、1を減算
          get_start = params[:nextStart] - 1

          if all_users.count > get_start + ALL_USERS_LIMIT
            users_count = get_start + ALL_USERS_LIMIT
            users = users_response(all_users, get_start, users_count)
            nextStart = users_count
          else
            users = users_response(all_users, get_start, all_users.count)
          end

          render status: 200, json: {status: 'SUCCESS', users: users, nextStart: nextStart}
        end
      else
        if all_users.count <= ALL_USERS_LIMIT
          users = users_response(all_users, 0, all_users.count)
        else
          users = users_response(all_users, 0, ALL_USERS_LIMIT)

          # 実際の件数に合わせるために、1を加算
          nextStart = ALL_USERS_LIMIT + 1
        end
        render status: 200, json: {status: 'SUCCESS', users: users, nextStart: nextStart}
      end
    else
      render status: 400, json: {status: 'ERROR', errorDetail: 'error'}
    end
  end

  def create
    user = user_params

    if User.find_by(name: user[:name])
      render status: 400, json: {status: 'ERROR', errorDetail: 'alreadyRegist'} and return
    end

    user[:uid] = create_uid
    user[:password] = encryption_password(user[:password])
    user = User.new(user)

    if user.save
      render status: 200, json: {status: 'SUCCESS', user: user}
    else
      render status: 400, json: {status: 'ERROR', errorDetail: user.errors}
    end
  end

  def show
    user = User.find_by(uid: params[:uid])

    if user
      render status: 200, json: {status: 'SUCCESS', user: user}
    else
      render status: 400, json: {status: 'ERROR', errorDetail: 'illegalUid'}
    end
  end

  def update
    update_user = Hash.new()
    user = User.find_by(uid: params[:uid])

    if user
      if params[:currentPassword].present? && params[:newPassword].present?
        encode_password = encryption_password(params[:currentPassword])

        if user[:password] == encode_password
          update_user[:password] = encryption_password(params[:newPassword])
        else
          render status: 400, json: {status: 'ERROR', errorDetail: 'currentPasswordError'} and return
        end
      end

      if params[:name]
        if (User.find_by(name: params[:name])) && (user[:name] != params[:name])
          render status: 400, json: {status: 'ERROR', errorDetail: 'alreadyRegist'} and return
        else
          update_user[:name] = params[:name]
        end
      end

      if params[:description].present?
        update_user[:description] = params[:description]
      end

      if user.update(update_user)
        render status: 200, json: {status: 'SUCCESS', user: user}
      else
        render status: 400, json: {status: 'ERROR', errorDetail: user.errors}
      end
    else
      render status: 400, json: {status: 'ERROR', errorDetail: 'illegalUid'}
    end
  end

  def destroy
  end

  private
  def user_params
    params.require(:user).permit(:name, :password)
  end

  def create_uid
    begin
      uid = SecureRandom.hex()
    end while User.find_by(uid: uid)

    return uid
  end

  def encryption_password(password)
    Digest::MD5.hexdigest(password)
  end

  def users_response(all_users, start, stop)
    users = Array.new()
    all_users = all_users[start...stop]
      for i in (0...stop-start) do
        user = Hash.new()
        user = {'uid' => all_users[i]['uid'], 'name' => all_users[i]['name']}
        users.push(user)
      end
    return users
  end
end
