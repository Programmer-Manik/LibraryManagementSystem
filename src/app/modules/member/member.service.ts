import { Member, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAllMember = async () => {
  const result = await prisma.member.findMany();
  return result;
};

const createMember = async (data: Member) => {
  try {
    await prisma.member.findUniqueOrThrow({
      where: {
        email: data.email,
      },
    });
    throw new Error("Email already exists");
  } catch (err: any) {
    if (err.name !== "NotFoundError") {
      throw err;
    }
  }

  const result = await prisma.member.create({ data });
  return result;
};

const getSingleMember = async (memberId: string) => {
  const result = await prisma.member.findUnique({
    where: {
      memberId,
    },
  });
  return result;
};

const updateMember = async (
  memberId: string,
  data: Partial<Member>
): Promise<Member> => {
  await prisma.member.findUniqueOrThrow({
    where: {
      memberId,
    },
  });

  const result = await prisma.member.update({
    where: {
      memberId,
    },
    data,
  });
  return result;
};

const deleteMember = async (memberId: string) => {
  await prisma.member.findUniqueOrThrow({
    where: {
      memberId,
    },
  });

  const result = await prisma.member.delete({
    where: {
      memberId,
    },
  });
};

export const MemberService = {
  getAllMember,
  createMember,
  getSingleMember,
  updateMember,
  deleteMember
};
