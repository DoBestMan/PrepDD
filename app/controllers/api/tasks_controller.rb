class Api::TasksController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :set_list, only: %i[import_task]

  def import_task
    Task.import(params[:file], @list.id)
    render json: {status: true, list: @list, tasks: @list.tasks}
  end

  private

  def set_list
    @list = List.find(task_params[:list_id])
  end

  def task_params
    params.permit(:list_id, file: [])
  end
end
