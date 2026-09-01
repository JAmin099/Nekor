'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

/** Error keys, not sentences — the copy lives in messages/*.json. */
const schema = z.object({
  name: z.string().min(2, 'nameRequired'),
  email: z.string().email('emailInvalid'),
  company: z.string().optional(),
  message: z.string().min(20, 'messageTooShort'),
  privacy: z.literal(true, { errorMap: () => ({ message: 'privacyRequired' }) })
});

type Values = z.infer<typeof schema>;
type Status = 'idle' | 'success' | 'error';

export function ContactForm() {
  const t = useTranslations('contact.form');
  const [status, setStatus] = useState<Status>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<Values>({ resolver: zodResolver(schema) });

  async function onSubmit(values: Values) {
    setStatus('idle');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      });
      if (!response.ok) throw new Error('request failed');
      reset();
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  const field =
    'w-full border border-ink/20 bg-transparent px-4 py-3.5 text-base outline-none transition-colors duration-200 placeholder:text-ink/35 focus:border-copper';

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="font-mono text-eyebrow uppercase text-ink/50">
            {t('name')}
          </label>
          <input
            id="name"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            className={cn(field, 'mt-3', errors.name && 'border-copper-deep')}
            {...register('name')}
          />
          {errors.name ? (
            <p role="alert" className="mt-2 text-sm text-copper-deep">
              {t(`errors.${errors.name.message}`)}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="email" className="font-mono text-eyebrow uppercase text-ink/50">
            {t('email')}
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            className={cn(field, 'mt-3', errors.email && 'border-copper-deep')}
            {...register('email')}
          />
          {errors.email ? (
            <p role="alert" className="mt-2 text-sm text-copper-deep">
              {t(`errors.${errors.email.message}`)}
            </p>
          ) : null}
        </div>
      </div>

      <div>
        <label htmlFor="company" className="font-mono text-eyebrow uppercase text-ink/50">
          {t('company')}
        </label>
        <input
          id="company"
          autoComplete="organization"
          className={cn(field, 'mt-3')}
          {...register('company')}
        />
      </div>

      <div>
        <label htmlFor="message" className="font-mono text-eyebrow uppercase text-ink/50">
          {t('message')}
        </label>
        <textarea
          id="message"
          rows={6}
          aria-invalid={Boolean(errors.message)}
          placeholder={t('messagePlaceholder')}
          className={cn(field, 'mt-3 resize-y', errors.message && 'border-copper-deep')}
          {...register('message')}
        />
        {errors.message ? (
          <p role="alert" className="mt-2 text-sm text-copper-deep">
            {t(`errors.${errors.message.message}`)}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="privacy" className="flex items-start gap-3 text-sm leading-relaxed text-ink/70">
          <input
            id="privacy"
            type="checkbox"
            className="mt-1 h-4 w-4 shrink-0 accent-copper"
            {...register('privacy')}
          />
          <span>{t('privacy')}</span>
        </label>
        {errors.privacy ? (
          <p role="alert" className="mt-2 text-sm text-copper-deep">
            {t(`errors.${errors.privacy.message}`)}
          </p>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? t('sending') : t('submit')}
        </Button>
        {status === 'success' ? (
          <p role="status" className="text-sm text-ink">
            {t('success')}
          </p>
        ) : null}
        {status === 'error' ? (
          <p role="alert" className="text-sm text-copper-deep">
            {t('error')}
          </p>
        ) : null}
      </div>
    </form>
  );
}
