class UserSerializer < ActiveModel::Serializer
  # ユーザーに関する送受信される値を定義
  attributes :id, :name
  # アソシエーション(has_many, belongs_toも必要なら記述)
end
