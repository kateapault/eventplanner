class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :name, :age, :email, :phone_number
end
