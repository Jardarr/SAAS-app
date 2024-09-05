-- CreateTable
CREATE TABLE "Tasklist" (
    "id" STRING NOT NULL,
    "task" STRING NOT NULL,
    "userName" STRING NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Tasklist_pkey" PRIMARY KEY ("id")
);
