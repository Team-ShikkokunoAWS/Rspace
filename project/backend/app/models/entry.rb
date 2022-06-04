class Entry < ApplicationRecord
  belongs_to :user, foreign_key: 'uid'
  belongs_to :room
end
