class User < ApplicationRecord
  has_many :messages, foreign_key: 'uid'
  has_many :entries, foreign_key: 'uid'
  has_many :rooms, through: :entries, foreign_key: 'uid'
end
