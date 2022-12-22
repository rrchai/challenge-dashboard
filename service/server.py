import uvicorn


def main():
    """Run through uvicorn when run."""
    uvicorn.run("main:app",
                host="0.0.0.0",
                port=8800,
                reload=True,
                # root_path="/api/v1"
                )


if __name__ == "__main__":
    main()
