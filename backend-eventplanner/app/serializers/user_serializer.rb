class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :name, :age, :email, :phone_number

  has_many :events
  has_many :tickets
end
