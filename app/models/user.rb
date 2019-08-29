class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable, :recoverable, :rememberable

  validate :email_or_uuid
  has_many :roles_users
  has_many :teams_users
  has_many :users_companies
  has_many :roles, through: :roles_users
  has_many :teams, through: :teams_users
  has_many :companies, through: :users_companies
  has_many :owned_companies,
           class_name: 'Company', foreign_key: 'owner_id', dependent: :destroy

  has_one_attached :profile_picture

  def self.search(query)
    User.where("lower(email) LIKE :email_search OR lower(full_name) LIKE :search", email_search: "#{query.downcase}", search: "%#{query.downcase}%",)
  end

  def email_or_uuid
    if !self.email.present? && !self.uuid.present?
      errors.add(:base, 'Email is required')
    end
  end

  def self.linkedin_auth(token)
    require 'net/http'
    require 'uri'
    require 'json'

      uri = URI.parse("https://www.linkedin.com/oauth/v2/accessToken?code=#{token}&grant_type=authorization_code&client_secret=WEtzX4TyCF0ubk9l&client_id=867vhof1bgd0vm&redirect_uri=https://app-prepdd-staging.herokuapp.com/linkedin")
    request = Net::HTTP::Post.new(uri)
    req_options = { use_ssl: uri.scheme == 'https' }
    response =
      Net::HTTP.start(uri.hostname, uri.port, req_options) do |http|
        http.request(request)
      end
    p response.body
    body = JSON.parse(response.body)
    auth_token = body['access_token']

    uri = URI.parse('https://api.linkedin.com/v2/me')
    request = Net::HTTP::Get.new(uri)
    request.content_type = 'application/json'
    request['Authorization'] = "Bearer #{auth_token}"
    request['Accept'] = 'application/json'
    request['X-Restli-Protocol-Version'] = '2.0.0'

    req_options = { use_ssl: uri.scheme == 'https' }

    response =
      Net::HTTP.start(uri.hostname, uri.port, req_options) do |http|
        http.request(request)
      end
    profile = JSON.parse(response.body)
  end
end
