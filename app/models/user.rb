class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable,
         :registerable,
         :recoverable,
         :rememberable,
         :validatable,
         authentication_keys: { email: false, login: false }

  has_many :roles_users
  has_many :teams_users
  has_many :roles, through: :roles_users
  has_many :teams, through: :teams_users
  has_many :owned_companies,
           class_name: 'Company', foreign_key: 'owner_id', dependent: :destroy
  belongs_to :company, optional: true
end
