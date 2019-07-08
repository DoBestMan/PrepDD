class CreateCompanies < ActiveRecord::Migration[5.2]
  def change
    create_table :companies do |t|
      t.string :name
      t.bigint :parent_id
      t.bigint :broker_co_id
      t.bigint :subscription_id
      t.boolean :is_active
      
      t.timestamps
    end
  end
end
