class Api::V1::MessagesController < ApplicationController
  def all_messages
    messages = Message.find_by(room_id: params[:room_id])

    if messages
      render status: 200, json: {status: 'SUCCESS', messages: messages}
    else
      render status: 400, json: {status: 'ERROR', errorDetail: 'illegalRoomId'}
    end
  end

  def create
    message = Message.new(message_params)

    if message.save
      render status: 200, json: {status: 'SUCCESS', message: message}
    else
      render status: 400, json: {status: 'ERROR', errorDetail: message.errors}
    end
  end

  private
  def message_params
    params.require(:message).permit(:uid, :room_id, :message)
  end
end
