class Role < ApplicationRecord
  has_many :roles_users
  has_many :users, through: :roles_users

  before_validation :customize_title
  validates :title, uniqueness: true

  def customize_title(role_title = title)
    self.title = role_title.camelize.titlecase.gsub(/\s+/, '')
  end

  def self.add(title)
    where(title: title).first_or_create
  rescue StandardError
    raise ArgumentError, 'Argument title not valid.'
  end
end
