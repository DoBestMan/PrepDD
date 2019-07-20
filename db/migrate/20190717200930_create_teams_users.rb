class CreateTeamsUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :teams_users do |t|
      t.belongs_to :user
      t.belongs_to :team
      t.timestamps
    end
  end
end
