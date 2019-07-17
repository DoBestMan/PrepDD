class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable,
         :registerable,
         :recoverable,
         :rememberable,
         :validatable, authentication_keys: {email: true, login: false}

  has_many :roles_users
  has_many :users, through: :roles_users
  has_many :owned_companies,
           class_name: 'Company', foreign_key: 'owner_id', dependent: :destroy
  belongs_to :company, optional: true

  validates :full_name, presence: true
end
