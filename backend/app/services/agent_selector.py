from app.agents.router_agent import RouterAgent
from app.agents.planner_agent import PlannerAgent
from app.agents.research_agent import ResearchAgent
from app.agents.coding_agent import CodingAgent
from app.agents.critic_agent import CriticAgent
from app.agents.super_agent import SuperAgent

router = RouterAgent()

planner = PlannerAgent()
research = ResearchAgent()
coder = CodingAgent()
critic = CriticAgent()
super_agent = SuperAgent()

AGENT_MAP = {
    "planner": planner,
    "research": research,
    "coder": coder,
    "critic": critic,
    "super": super_agent
}

cache = {}

def select_agent(task: str):
    if task in cache:
        return cache[task]

    agent_name = router.run(task)

    agent = AGENT_MAP.get(agent_name, research)

    cache[task] = agent
    return agent
