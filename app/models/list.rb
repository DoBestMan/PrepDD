class List < ApplicationRecord
  belongs_to :requester, class_name: 'Company', foreign_key: 'requester_id', optional: true
  belongs_to :responder, class_name: 'Company', foreign_key: 'responder_id', optional: true

  has_many :tasks
  has_many :lists_users
  has_many :owners, class_name: 'User', through: :lists_users, source: :user

  after_create :add_rank

  def add_rank
    self.responder_rank = self.id
    self.requester_rank = self.id
    self.save!
  end
end
