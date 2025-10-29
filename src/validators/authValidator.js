import { z } from "zod";

// 회원가입 스키마
export const signupSchema = z
  .object({
    email: z
      .string({
        required_error: "이메일은 필수 입력 항목입니다.",
      })
      .email("올바른 이메일 형식이 아닙니다.")
      .max(255, "이메일은 최대 255자까지 입력 가능합니다."),
    password: z
      .string({
        required_error: "비밀번호는 필수 입력 항목입니다.",
      })
      .min(8, "비밀번호는 최소 8자 이상이어야 합니다.")
      .max(100, "비밀번호는 최대 100자까지 입력 가능합니다."),
    passwordConfirmation: z.string({
      required_error: "비밀번호 확인은 필수 입력 항목입니다.",
    }),
    nickname: z
      .string({
        required_error: "닉네임은 필수 입력 항목입니다.",
      })
      .min(1, "닉네임은 최소 1자 이상이어야 합니다.")
      .max(20, "닉네임은 최대 20자까지 입력 가능합니다.")
      .trim(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordConfirmation"],
  });

// 로그인 스키마
export const loginSchema = z.object({
  email: z
    .string({
      required_error: "이메일은 필수 입력 항목입니다.",
    })
    .email("올바른 이메일 형식이 아닙니다."),
  password: z
    .string({
      required_error: "비밀번호는 필수 입력 항목입니다.",
    })
    .min(1, "비밀번호를 입력해주세요."),
});
