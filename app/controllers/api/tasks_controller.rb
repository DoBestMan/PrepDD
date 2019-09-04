class Api::TasksController < ApplicationController
  skip_before_action :verify_authenticity_token

  def import_task
    tasks  = Task.import(params[:file])
    render json: {status: true, tasks: tasks}
  end

  private

  def task_params
    params.permit(:list_id, file: [])
  end
end
