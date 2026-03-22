from app.agents.router_agent import RouterAgent
from app.agents.planner_agent import PlannerAgent
from app.agents.research_agent import ResearchAgent
from app.agents.coding_agent import CodingAgent
from app.agents.critic_agent import CriticAgent

router = RouterAgent()

planner = PlannerAgent()
research = ResearchAgent()
coder = CodingAgent()
critic = CriticAgent()

AGENT_MAP = {
    "planner": planner,
    "research": research,
    "coder": coder,
    "critic": critic
}

cache = {}

def select_agent(task: str):
    if task in cache:
        return cache[task]

    agent_name = router.run(task)

    agent = AGENT_MAP.get(agent_name, research)

    cache[task] = agent
    return agent
