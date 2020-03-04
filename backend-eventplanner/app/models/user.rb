class User < ApplicationRecord
    has_many :events
    has_many :tickets

    validates :username, uniqueness: true
    validates :name, presence: true
    
end
