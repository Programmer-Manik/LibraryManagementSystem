import express from 'express';
import { MemberController } from './member.controller';

const router = express.Router();

router.get('/', MemberController.getAllMemberFromDB);

router.post('/', MemberController.createMemberToDB);

router.get("/:memberId", MemberController.getSingleMemberFromDB);

router.put("/:memberId", MemberController.updateMemberFromDB);

router.delete("/:memberId", MemberController.deleteMemberFromBD);

export const MemberRoutes = router;