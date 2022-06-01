class Room < ApplicationRecord
  has_many :entries
  has_many :messages, dependent: :destroy
  has_many :users, through: :entries, foreign_key: 'uid'
end
