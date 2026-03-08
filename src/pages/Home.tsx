import Hero from '../components/Hero';
import Services from '../components/Services';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import Location from '../components/Location';

export default function Home() {
    return (
        <>
            <Hero />
            <Services />
            <Features />
            <Testimonials />
            <FAQ />
            <Location />
        </>
    );
}
