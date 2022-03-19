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
        render status: 400, json: {status: 'ERROR', error_detail: 'password_error'}
      end
    else
      render status: 400, json: {status: 'ERROR', error_detail: 'name_error'}
    end
  end

  def all_users
    all_users = User.all.order(created_at: 'ASC')

    if all_users
      if params[:next_start]
        if params[:next_start] > all_users.count
          render status: 400, json: {status: 'ERROR', error_detail: 'illegal_next_start'} and return
        else
          # 配列のインデックスに合わせるため、1を減算
          get_start = params[:next_start] - 1

          if all_users.count > get_start + ALL_USERS_LIMIT
            users_count = get_start + ALL_USERS_LIMIT
            users = users_response(all_users, get_start, users_count)
            users['next_start'] = users_count
          else
            users = users_response(all_users, get_start, all_users.count)
          end

          render status: 200, json: {status: 'SUCCESS', users: users}
        end
      else
        if all_users.count <= ALL_USERS_LIMIT
          users = users_response(all_users, 0, all_users.count)
        else
          users = users_response(all_users, 0, ALL_USERS_LIMIT)

          # 実際の件数に合わせるために、1を加算
          users['next_start'] = ALL_USERS_LIMIT + 1
        end
        render status: 200, json: {status: 'SUCCESS', users: users}
      end
    else
      render status: 400, json: {status: 'ERROR', error_detail: 'error'}
    end
  end

  def create
    user = user_params

    if User.find_by(name: user[:name])
      render status: 400, json: {status: 'ERROR', error_detail: 'already_regist'} and return
    end

    user[:uid] = create_uid
    user[:password] = encryption_password(user[:password])
    user = User.new(user)

    if user.save
      render status: 200, json: {status: 'SUCCESS', user: user}
    else
      render status: 400, json: {status: 'ERROR', error_detail: user.errors}
    end
  end

  def show
  end

  def update
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
    users = Hash.new()

    all_users = all_users[start...stop]

    for i in (0...stop-start) do
      users[i] = {'uid' => all_users[i]['uid'], 'name' => all_users[i]['name']}
    end

    return users
  end
end
