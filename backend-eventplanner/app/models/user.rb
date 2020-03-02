class User < ApplicationRecord
    has_many :events
    has_many :tickets
end
