class Team < ApplicationRecord
  has_many :teams_users
  has_many :users, through: :teams_users
  belongs_to :company

  has_many :lists_users
  has_many :lists, through: :lists_users
end
