class CreateParentCompanies < ActiveRecord::Migration[5.2]
  def change
    create_table :parent_companies do |t|
      t.belongs_to :child_company
      t.belongs_to :parent_company
      t.timestamps
    end
  end
end
