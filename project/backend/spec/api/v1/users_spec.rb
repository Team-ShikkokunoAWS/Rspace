# coding: utf-8
require 'rails_helper'

RSpec.describe "Users", type: :request do
  describe '新規登録' do
    context '正常系' do
      it 'nameとpasswordが正常な場合' do
        @params = {
          name: 'なまえ',
          password: 'password'
        }

        expect(response.status).to eq(200)
        # expect { post 'api/v1/users', params: { post: @params } }.to change(Post, :count).by(+1)
      end
    end

    context '異常系' do
      it '空のリクエストを送信' do
        post '/api/v1/users', params: {}
        expect(response).to have_http_status(400)
      end
    end
  end
end
