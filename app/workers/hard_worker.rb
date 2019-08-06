class HardWorker
  include Sidekiq::Worker

  def perform(name, count)
    p name
    p count
  end
end
