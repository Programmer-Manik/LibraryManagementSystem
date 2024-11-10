import { Book, Member, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createMember = async (data: Member) => {
  const newMember = await prisma.member.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      membershipDate: data.membershipDate,
    },
  });

  return newMember;
};

const getAllMembers = async () => {
  const members = await prisma.member.findMany();
  return members;
};

const getMemberById = async (memberId: string) => {
  const member = await prisma.member.findUnique({
    where: { memberId },
  });
  return member;
};

const updateMember = async (memberId: string, data: Partial<Member>) => {
  const updatedMember = await prisma.member.update({
    where: { memberId },
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
    },
  });

  return updatedMember;
};

const deleteMember = async (memberId: string) => {
  const deletedMember = await prisma.member.delete({
    where: { memberId },
  });

  return deletedMember;
};

export const memberService = {
  createMember,
  getAllMembers,
  getMemberById,
  updateMember,
  deleteMember,
};
