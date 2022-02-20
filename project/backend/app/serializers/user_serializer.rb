class UserSerializer < ActiveModel::Serializer
  attributes :uid, :name, :password, :is_vaild
end
