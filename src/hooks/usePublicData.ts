import { useEffect, useState, useCallback } from 'react';
import type { Project, Service, Testimonial } from '@/types';
import { fetchPublishedProjects } from '@/services/projects';
import { fetchPublishedServices } from '@/services/services';
import { fetchPublishedTestimonials } from '@/services/testimonials';

export function usePublishedProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchPublishedProjects();
      setProjects(data);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load projects');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { projects, loading, error, reload: load };
}

export function usePublishedServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchPublishedServices();
        setServices(data);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to load services');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { services, loading, error };
}

export function usePublishedTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchPublishedTestimonials();
        setTestimonials(data);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to load testimonials');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { testimonials, loading, error };
}
