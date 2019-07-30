class AddS3BucketLocationToCompany < ActiveRecord::Migration[5.2]
  def change
    change_table :companies do |t|
      t.string :s3_location
    end
  end
end
