class Api::TasksController < ApplicationController
  skip_before_action :verify_authenticity_token

  def import_task
    status = true
    # begin
      tasks = Task.import(params[:files])
    # rescue StandardError
    #   status = false
    # end
    render json: { status: status, tasks: tasks }
  end

  private

  def task_params
    params.permit(:list_id, files: [])
  end
end
