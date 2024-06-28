import { Form as AntdForm } from "antd";
import { useTranslation } from "react-i18next";
import { useEffect, Children, cloneElement, isValidElement } from "react";
import type { Control, FieldPath, FieldValues } from "react-hook-form";
import { useController } from "react-hook-form";

type AntdFormItemProps = React.ComponentProps<typeof AntdForm.Item>;

export type FormItemProps<TFieldValues extends FieldValues = FieldValues> = {
  children: React.ReactNode;
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  disabled?: boolean;
  alertLevel?: Extract<
    AntdFormItemProps["validateStatus"],
    "error" | "warning"
  >;
  enableI18n?: boolean;
} & Omit<AntdFormItemProps, "name" | "rules" | "validateStatus">;

/**
 * 這個元件是對 Ant Design Form.Item 的包裝, 並且整合進 react-hook-form
 * source code: https://github.com/jsun969/react-hook-form-antd/blob/main/src/FormItem.tsx
 */
export function FormItem<TFieldValues extends FieldValues = FieldValues>({
  children,
  control,
  name,
  disabled = false,
  valuePropName,
  alertLevel = "error",
  enableI18n = true,
  ...props
}: FormItemProps<TFieldValues>) {
  const { field, fieldState } = useController({ name, control, disabled });
  const form = AntdForm.useFormInstance();
  const { t } = useTranslation();

  useEffect(() => {
    form.setFieldValue(name, field.value);
  }, [field.value, form, name]);

  let validateText = "";

  if (fieldState.error?.message && fieldState.error?.message !== " ") {
    // 若有 enableI18n, 則把 *.schema.ts 中 zod 回傳的 message 當作 i18n key
    // zod 回傳的 i18n key 請盡量是完整格式, 例如: "auth:loginForm.schema.invalidEmailFormat"
    validateText = enableI18n
      ? t(fieldState.error.message)
      : fieldState.error.message;
  }
  return (
    <AntdForm.Item
      {...props}
      // @ts-expect-error Ant Design form item name type safe is not necessary here
      name={name}
      initialValue={field.value}
      validateStatus={fieldState.invalid ? alertLevel : undefined}
      help={validateText}
    >
      {Children.map(
        children,
        (child) =>
          isValidElement(child) &&
          cloneElement(child, {
            ...field,
            // @ts-expect-error onChange type safe is not necessary here
            onChange: (...params) => {
              if (child.props.onChange) child.props.onChange(...params);
              field.onChange(...params);
            },
            onBlur: () => {
              if (child.props.onBlur) child.props.onBlur();
              field.onBlur();
            },
            ...(valuePropName && {
              [valuePropName]: field.value,
            }),
          }),
      )}
    </AntdForm.Item>
  );
}
