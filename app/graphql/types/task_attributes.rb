class Types::TaskAttributes < Types::BaseInputObject
  description 'Attributes for creating or updating a task'

  argument :name, String, required: true
  argument :description, String, required: true
  argument :priority, String, required: true
  argument :status, String, required: true
  argument :due_date, String, required: true
  argument :section, String, required: true
  argument :isActive, Boolean, required: true
end
