class Api::TasksController < ApplicationController
  skip_before_action :verify_authenticity_token

  def import_task

    status = true
    begin
      tasks = Task.import(task_params[:files])
    rescue => error
      Rails.logger.info error
      status = false
    end
    render json: { status: status, tasks: tasks }
  end

  private

  def task_params
    params.permit(files: [])
  end
end
