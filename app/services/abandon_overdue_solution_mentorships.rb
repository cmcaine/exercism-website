class AbandonOverdueSolutionMentorships
  include Mandate

  def call
    SolutionMentorship.where("requires_action_since < ?", Time.current - 7.days).
                       each do |mentorship|
      AbandonSolutionMentorship.(mentorship, :timed_out)
    end
  end
end
