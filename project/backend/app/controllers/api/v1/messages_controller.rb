# coding: utf-8
require 'json'

class Api::V1::MessagesController < ApplicationController
  def all_messages
    if Room.find_by(id: params[:roomId])
      messages = Message.where(room_id: params[:roomId])

      if messages.present?
        response = messages_response(messages)
        render status: 200, json: {status: 'SUCCESS', messages: response}
      else
        render status: 200, json: {status: 'SUCCESS', messages: []}
      end
    else
      render status: 400, json: {status: 'ERROR', errorDetail: 'illegalRoomId'}
    end
  end

  def unread_messages
    partner_uid = get_partner_uid(params[:roomId], params[:uid])
    if !partner_uid
      render status: 400,
        json: {status: 'ERROR', errorDetail: 'illegalRoomId'} and return
    end

    messages = Message.where(
      room_id: params[:roomId],
      uid: partner_uid,
      is_unread: true
    )
    if messages.present?
      response = messages_response(messages)
      messages.each do |message|
        message.update_is_read
      end
      render status: 200, json: {status: 'SUCCESS', messages: response}
    else
      render status: 400,
        json: {status: 'ERROR', errorDetail: 'cannotGetMessages'}
    end
  end

  def create
    message = Message.new(
      uid: params[:uid], room_id: params[:roomId], message: params[:message]
    )

    if message.save
      response = message.message_response
      render status: 200, json: {status: 'SUCCESS', message: response}
    else
      render status: 400, json: {status: 'ERROR', errorDetail: message.errors}
    end
  end

  private
  def messages_response(messages)
    response = []
    messages.each do |message|
      response << message.message_response
    end

    return response
  end

  def get_partner_uid(room_id, client_uid)
    entries = Entry.where(room_id: room_id)

    entries.each do |entry|
      if entry.uid != client_uid
        return entry.uid
      end
    end
  end
end
