from fastapi import APIRouter
from app.core.queue import redis_conn
from rq.job import Job

router = APIRouter()


@router.get("/job/{job_id}")
def get_job_status(job_id: str):
    try:
        job = Job.fetch(job_id, connection=redis_conn)
        return {
            "status": job.get_status(),
            "result": job.result if job.is_finished else None
        }

    except Exception as e:
        return {
            "error": str(e)
        }
