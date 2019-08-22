class AddLastCompanyIdToUser < ActiveRecord::Migration[5.2]
  def change
    change_table :users do |t|
      t.bigint :last_viewed_company
    end
  end
end
