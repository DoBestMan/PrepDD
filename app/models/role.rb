class Role < ApplicationRecord
  has_many :roles_users
  has_many :users, through: :roles_users

  before_validation :customize_title
  validates :name, uniqueness: true

  def customize_title(role_name = title)
    self.name = role_name.camelize.titlecase.gsub(/\s+/, '')
  end

  def self.add(name)
    where(title: name).first_or_create
  rescue StandardError
    raise ArgumentError, 'Argument title not valid.'
  end
end
