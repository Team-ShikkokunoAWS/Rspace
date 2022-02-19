require 'securerandom'
require 'digest/md5'

class Api::V1::UsersController < ApplicationController
  def index
  end

  def create
    user = user_params
    user[:uid] = create_uid
    user[:password] = encryption_password(user[:password])
    user = User.new(user)

    if user.save
      render status: 200, json: {status: 'SUCCESS', data: user}
    else
      render status: 400, json: {status: 'ERROR', data: user.errors}
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
end
