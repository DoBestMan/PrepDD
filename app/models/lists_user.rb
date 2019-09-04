class ListsUser < ApplicationRecord
  belongs_to :list
  belongs_to :user, optional: true
  belongs_to :team, optional: true
end
