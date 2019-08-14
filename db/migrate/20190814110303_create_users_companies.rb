class CreateUsersCompanies < ActiveRecord::Migration[5.2]
  def change
    create_table :users_companies do |t|
      t.belongs_to :company
      t.belongs_to :user

      t.timestamps
    end
  end
end
