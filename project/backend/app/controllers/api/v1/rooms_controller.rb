class Api::V1::RoomsController < ApplicationController
  def all_rooms
    rooms = Room.all.order(created_at: 'ASC')

    if rooms
      render status: 200, json: {status: 'SUCCESS', rooms: rooms}
    else
      render status: 400, json: {status: 'ERROR', errorDetail: 'cannotGetRooms'}
    end
  end

  def index
    user = User.find_by(uid: params[:uid])
    rooms = user.entries

    if rooms
      render status: 200, json: {status: 'SUCCESS', rooms: rooms}
    else
      render status: 400, json: {status: 'ERROR', errorDetail: 'cannotGetRooms'}
    end
  end

  def show
    entries = Entry.where(room_id: params[:id])

    if !entries.present?
      render status: 400, json: {status: 'ERROR', errorDetail: 'illegalRoomId'} and return
    end

    menbers = []
    entries.each do |entry|
      menbers << entry.uid
    end

    room = {'id' => params[:id], 'menbers' => menbers}
    render status: 200, json: {status: 'SUCCESS', room: room}
  end

  def create
    client_entries = Entry.where(uid: params[:clientUid])
    partner_entries = Entry.where(uid: params[:partnerUid])

    client_room_ids = []
    client_entries.each do |entry|
      client_room_ids << entry.room_id
    end

    partner_room_ids = []
    partner_entries.each do |entry|
      partner_room_ids << entry.room_id
    end

    chat_room_id = nil
    client_room_ids.each do |client_room_id|
      chat_room_id = partner_room_ids.find {|i| i == client_room_id}
      if chat_room_id
        break
      end
    end

    if chat_room_id
      entries = Entry.where(room_id: chat_room_id)

      menbers = []
      entries.each do |entry|
        menbers << entry.uid
      end

      room = {'id' => chat_room_id, 'menbers' => menbers}
      render status: 200, json: {status: 'SUCCESS', room: room}
    else
      new_room = Room.new()

      if !new_room.save
        render status: 400, json: {status: 'ERROR', errorDetail: new_room.errors} and return
      end

      client_entry = new_room.entries.build(uid: params[:clientUid])
      partner_entry = new_room.entries.build(uid: params[:partnerUid])

      if !client_entry.save
        render status: 400, json: {status: 'ERROR', errorDetail: client_entry.errors} and return
      end
      if !partner_entry.save
        render status: 400, json: {status: 'ERROR', errorDetail: partner_entry.errors} and return
      end

      room = {
        'id' => new_room.id,
        'menbers' => [params[:clientUid], params[:partnerUid]]
      }
      render status: 200, json: {status: 'SUCCESS', room: room}
    end
  end
end
