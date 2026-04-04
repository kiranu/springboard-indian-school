"""
Management command to seed the database with sample blog posts, events, and gallery items.

Usage:
    python manage.py seed_content
    python manage.py seed_content --clear    # clears existing data first
"""
from django.core.management.base import BaseCommand
from django.utils.text import slugify


BLOGS = [
    {
        "title": "Welcome to Springboard Indian School",
        "category": "School Life",
        "author": "Principal",
        "excerpt": "We are thrilled to welcome you to Springboard Indian School, Hyderabad — where every child is nurtured to discover their unique potential in a caring, modern, and holistic environment.",
        "content": """Welcome to Springboard Indian School, Hyderabad — a place where learning goes beyond textbooks and every child is celebrated for who they are.

Our school was founded on the belief that education should spark curiosity, build character, and prepare students for a rapidly changing world. From our vibrant classrooms to our well-equipped labs and open playgrounds, every space at Springboard is designed with one goal: your child's all-round development.

We follow the CBSE curriculum from Play Group to Grade 7, blending structured academics with experiential learning, arts integration, and physical development. Our dedicated team of educators brings warmth and expertise to every classroom.

At Springboard, we partner with parents to build a community of learners. We believe that when school and home work together, children thrive. We look forward to growing together with your family.

Admissions are open for the upcoming academic year. We invite you to visit our campus and experience the Springboard difference for yourself.""",
        "featured_image": "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200&h=600&fit=crop",
        "is_published": True,
    },
    {
        "title": "Annual Sports Day 2026 — A Celebration of Team Spirit",
        "category": "Events",
        "author": "Sports Department",
        "excerpt": "Our Annual Sports Day 2026 was a spectacular showcase of athletic talent, healthy competition, and the unbeatable team spirit that defines the Springboard community.",
        "content": """The Springboard Indian School Annual Sports Day 2026 was an unforgettable celebration of fitness, sportsmanship, and school pride. Students from Play Group to Grade 7 participated enthusiastically in a wide variety of events held on our sprawling school grounds.

The day began with a colourful march-past led by the school captain, followed by the lighting of the sports torch. Our chief guest, a celebrated sports personality from Hyderabad, addressed the students with inspiring words about discipline, persistence, and the joy of sport.

Track and field events dominated the morning session, with students breaking school records in the 100m sprint and long jump. The tug-of-war between Grade 6 and Grade 7 drew roars of laughter and encouragement from parents and teachers alike. The afternoon saw exciting relay races and the much-anticipated obstacle course for younger students.

The day concluded with a prize distribution ceremony. Every participant received a certificate of participation, and standout performers were awarded medals and trophies.

A heartfelt thank you to all parents who cheered from the stands and to our dedicated Physical Education teachers who prepared students for weeks in advance. The memories made on the field will last a lifetime!""",
        "featured_image": "https://images.unsplash.com/photo-1471295253337-3ceaaedca402?q=80&w=1200&h=600&fit=crop",
        "is_published": True,
    },
    {
        "title": "CBSE Board Exam Preparation: Tips from Our Toppers",
        "category": "Academics",
        "author": "Academic Head",
        "excerpt": "As board exams approach, our senior students and faculty share tried-and-tested strategies to help you prepare effectively, manage stress, and perform your best.",
        "content": """Board exam season can feel overwhelming, but with the right approach it becomes a structured, manageable journey. Here are proven strategies from Springboard's faculty and recent toppers.

Start Early, Plan Smart: Create a revision timetable at least 8 weeks before exams. Divide your syllabus into daily and weekly targets. Stick to the plan but allow flexibility for difficult topics.

Practise with Previous Papers: Solving previous years' CBSE question papers is one of the most effective preparation strategies. It helps you understand the exam pattern, manage time, and identify recurring question types.

Focus on Conceptual Clarity: CBSE exams increasingly test application and understanding rather than rote recall. Ensure you understand the 'why' behind every concept, especially in Science and Mathematics.

Take Care of Your Health: Sleep at least 7–8 hours every night. A well-rested brain retains information far better than an exhausted one. Exercise for at least 30 minutes daily to reduce stress hormones.

Revision Cycles: Use the technique of spaced repetition — revise a topic once after one day, once after a week, and once after a month. This dramatically improves long-term retention.

Seek Help Without Hesitation: Our subject teachers are available for extra doubt-clearing sessions. Use this resource generously. No question is too small when your performance is at stake.

Remember, exams measure a moment in your learning journey — not your worth or future. Give your best, stay calm, and trust the preparation you have put in.""",
        "featured_image": "https://images.unsplash.com/photo-1427504494785-389a056ac80f?q=80&w=1200&h=600&fit=crop",
        "is_published": True,
    },
    {
        "title": "Our Approach to Holistic Education at Springboard",
        "category": "Education",
        "author": "Principal",
        "excerpt": "At Springboard, we believe education must nurture the mind, body, and spirit equally. Discover how our holistic curriculum prepares children for life, not just examinations.",
        "content": """Education in the 21st century demands far more than textbook knowledge. At Springboard Indian School, we have built a curriculum that addresses the complete development of every child — cognitive, physical, social, emotional, and creative.

Our academic programme is rooted in the CBSE framework but enriched with project-based learning, inquiry-driven lessons, and real-world connections. Students don't just learn about the water cycle — they conduct experiments, visit water treatment plants, and create models that explain the concept to younger students.

Arts integration is central to our philosophy. Music, dance, visual arts, and drama are not extracurricular activities at Springboard — they are woven into the academic fabric. Research consistently shows that arts education improves mathematical reasoning, language skills, and emotional intelligence.

Our sports and physical education programme ensures that every student, regardless of ability, finds joy in movement. From yoga and athletics to team sports and martial arts, physical wellbeing is treated as seriously as academic achievement.

Social-emotional learning is embedded in our daily routines. Morning circles, peer mentoring programmes, and regular counselling sessions build empathy, resilience, and a strong sense of community.

Technology is leveraged thoughtfully — as a tool for creation and exploration, not passive consumption. Our students use digital tools to code, design, research, and collaborate.

At Springboard, we measure success not only by marks on a report card but by the confidence, curiosity, kindness, and capability our students carry with them into the world.""",
        "featured_image": "https://images.unsplash.com/photo-1485546246425-dca1fb46170d?q=80&w=1200&h=600&fit=crop",
        "is_published": True,
    },
    {
        "title": "Science Exhibition 2026 — Innovation in the Making",
        "category": "Achievements",
        "author": "Science Department",
        "excerpt": "The Springboard Science Exhibition 2026 was a dazzling display of young minds tackling real-world problems with creativity, curiosity, and scientific rigour.",
        "content": """The corridors of Springboard Indian School buzzed with excitement as over 80 science projects went on display at our Annual Science Exhibition 2026. From solar-powered models to AI-based sorting robots, our students demonstrated that the scientists of tomorrow are already here.

The theme this year was "Science for Sustainability" — encouraging students to address environmental and social challenges through scientific thinking. The response was extraordinary. Grade 5 students built a working mini water purification unit using sand and activated charcoal. Grade 7 students presented a prototype smart irrigation system using sensors that detect soil moisture levels.

A panel of judges — comprising scientists from CSIR-IICT Hyderabad and faculty from Osmania University — evaluated each project on originality, scientific accuracy, presentation skills, and practical applicability. The standard was impressively high.

Top prizes were awarded as follows:
- Best Project (Primary): "Solar Lamp for Villages" by Arjun and Priya (Grade 4)
- Best Project (Middle): "Smart Waste Sorter" by Team Alpha (Grade 7)
- Most Creative: "Seed Bomb Launcher for Reforestation" by Kavya (Grade 5)

Chief guest Dr. Ramesh Babu, a senior scientist at DRDO, praised the quality of research and urged students to carry their scientific temper into every aspect of life.

Congratulations to all participants, and a special mention to our science faculty whose tireless guidance made this event a resounding success.""",
        "featured_image": "https://images.unsplash.com/photo-1532094349884-543559ac4ddc?q=80&w=1200&h=600&fit=crop",
        "is_published": True,
    },
]

EVENTS = [
    {
        "title": "Annual Sports Day 2026",
        "description": "A grand celebration of athletics, team spirit, and school pride. Students from all grades compete in track events, team games, and the beloved obstacle course.",
        "content": """Join us for Springboard's biggest sporting event of the year! Annual Sports Day 2026 will feature track and field events, team relays, tug-of-war, and more across all age groups. Parents are warmly invited to cheer from the stands. Refreshments will be available. Wear your house colours and come ready to celebrate!

Schedule:
08:00 AM - March Past & Opening Ceremony
09:00 AM - Track & Field Events (Grades 1-4)
11:00 AM - Team Games & Relay Races (Grades 5-7)
01:00 PM - Lunch Break
02:00 PM - Finals & Special Events
04:00 PM - Prize Distribution & Closing Ceremony""",
        "event_date": "2026-04-20",
        "end_date": "2026-04-20",
        "location": "School Grounds, Springboard Indian School",
        "featured_image": "https://images.unsplash.com/photo-1471295253337-3ceaaedca402?q=80&w=800&h=450&fit=crop",
        "is_published": True,
    },
    {
        "title": "Science & Innovation Exhibition 2026",
        "description": "Students from Grades 3–7 present their science projects to parents, faculty, and an expert panel. Theme: Science for Sustainability.",
        "content": """The Annual Science & Innovation Exhibition is one of the most eagerly awaited events on the Springboard calendar. This year's theme, "Science for Sustainability," challenges students to design projects that address real-world environmental and social problems.

Over 80 projects will be on display across the school grounds. Expert judges from leading research institutions in Hyderabad will evaluate each entry and award prizes in multiple categories.

All parents and guardians are invited to walk through the exhibition halls, interact with our young scientists, and be amazed by what our students have achieved. Light refreshments will be served.""",
        "event_date": "2026-04-25",
        "end_date": "2026-04-26",
        "location": "School Hall & Grounds",
        "featured_image": "https://images.unsplash.com/photo-1532094349884-543559ac4ddc?q=80&w=800&h=450&fit=crop",
        "is_published": True,
    },
    {
        "title": "Parent-Teacher Meeting — Term 2",
        "description": "Quarterly Parent-Teacher Meeting for all grades. Discuss your child's academic progress, learning goals, and areas for growth with their class teachers.",
        "content": """We warmly invite all parents and guardians to our Term 2 Parent-Teacher Meeting. This is a valuable opportunity to sit one-on-one with your child's class teacher and subject teachers to discuss their academic performance, social development, and individual goals.

Please bring your child's assessment booklet if provided. Appointments will be available in 15-minute slots from 9:00 AM to 1:00 PM. Walk-in slots will be accommodated based on availability.

To schedule your appointment in advance, please use the school's parent portal or contact the school office before 3rd May.""",
        "event_date": "2026-05-08",
        "end_date": "2026-05-08",
        "location": "Respective Classrooms",
        "featured_image": "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&h=450&fit=crop",
        "is_published": True,
    },
    {
        "title": "Springboard Cultural Fest 2026 — Utsav",
        "description": "A vibrant celebration of India's diverse cultures through music, dance, drama, art, and cuisine. Students from every grade perform and showcase their talents.",
        "content": """Utsav — the Springboard Cultural Fest — is a celebration of India's rich and diverse cultural heritage. Students, teachers, and families come together for a day of music, dance, drama, art exhibitions, and regional food stalls representing different states of India.

Highlights this year include:
- Classical and folk dance performances by students
- A short play on Indian freedom fighters
- Regional food stalls managed by parent volunteers
- Art and craft exhibition featuring traditional Indian art forms
- Live music by the Springboard School Band
- Inter-house quiz on Indian culture and history

The event is open to all families, alumni, and friends of the school. Entry is free. Come dressed in traditional attire and celebrate the colours of India with us!""",
        "event_date": "2026-05-16",
        "end_date": "2026-05-16",
        "location": "School Auditorium & Open-Air Stage",
        "featured_image": "https://images.unsplash.com/photo-1526628953301-3e589a6a120a?q=80&w=800&h=450&fit=crop",
        "is_published": True,
    },
    {
        "title": "Annual Day Celebration & Graduation Ceremony 2026",
        "description": "The grandest event of the school year — a spectacular evening of performances, recognitions, and the graduation ceremony for our Grade 7 students.",
        "content": """Annual Day is the highlight of the Springboard calendar — an evening that brings together the entire school community to celebrate the achievements of the academic year and bid a proud farewell to our graduating Grade 7 class.

The evening will feature:
- Welcome address by the School Principal
- Cultural performances: dance, drama, music, and choir
- Academic awards and merit certificates
- Sports trophies and special recognition awards
- Graduation ceremony for Grade 7 students
- Guest of Honour address
- Vote of thanks and school anthem

Dress code: Formal attire. Gates open at 5:30 PM. The programme begins at 6:15 PM sharp. All parents and guardians are cordially invited. Seats will be allocated on a first-come basis, so please arrive early.

This is an evening to cherish — let's celebrate our children's journey together.""",
        "event_date": "2026-06-12",
        "end_date": "2026-06-12",
        "location": "School Auditorium",
        "featured_image": "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=800&h=450&fit=crop",
        "is_published": True,
    },
]

GALLERY = [
    {
        "title": "School Main Building",
        "category": "Campus",
        "image_url": "/assets/img/gallery/gallery-1.jpg",
        "is_published": True,
        "sort_order": 1,
    },
    {
        "title": "Modern Science Laboratory",
        "category": "Academics",
        "image_url": "/assets/img/gallery/gallery-2.jpg",
        "is_published": True,
        "sort_order": 2,
    },
    {
        "title": "Annual Sports Day Action",
        "category": "Sports",
        "image_url": "/assets/img/gallery/gallery-3.jpg",
        "is_published": True,
        "sort_order": 3,
    },
    {
        "title": "Cultural Fest — Utsav 2026",
        "category": "Events",
        "image_url": "/assets/img/gallery/gallery-4.jpg",
        "is_published": True,
        "sort_order": 4,
    },
    {
        "title": "Student Art Exhibition",
        "category": "Arts",
        "image_url": "/assets/img/gallery/gallery-5.jpg",
        "is_published": True,
        "sort_order": 5,
    },
    {
        "title": "School Playground",
        "category": "Campus",
        "image_url": "/assets/img/gallery/gallery-6.jpg",
        "is_published": True,
        "sort_order": 6,
    },
    {
        "title": "Classroom Learning",
        "category": "Academics",
        "image_url": "/assets/img/gallery/gallery-7.jpg",
        "is_published": True,
        "sort_order": 7,
    },
]


class Command(BaseCommand):
    help = "Seed the database with sample blog posts, events, and gallery items."

    def add_arguments(self, parser):
        parser.add_argument(
            "--clear",
            action="store_true",
            help="Delete existing blogs, events and gallery items before seeding.",
        )

    def handle(self, *args, **options):
        from apps.blog.models import Blog
        from apps.events.models import Event
        from apps.gallery.models import GalleryItem

        if options["clear"]:
            Blog.objects.all().delete()
            Event.objects.all().delete()
            GalleryItem.objects.all().delete()
            self.stdout.write(self.style.WARNING("Cleared existing Blog, Event, and Gallery data."))

        # ── Blogs ──────────────────────────────────────────────
        blogs_created = 0
        for data in BLOGS:
            slug = slugify(data["title"])
            if not Blog.objects.filter(slug=slug).exists():
                Blog.objects.create(
                    title=data["title"],
                    slug=slug,
                    category=data["category"],
                    author=data["author"],
                    excerpt=data["excerpt"],
                    content=data["content"],
                    featured_image=data["featured_image"],
                    is_published=data["is_published"],
                )
                blogs_created += 1
        self.stdout.write(self.style.SUCCESS(f"✓ Created {blogs_created} blog post(s)  (skipped duplicates)"))

        # ── Events ─────────────────────────────────────────────
        events_created = 0
        for data in EVENTS:
            slug = slugify(data["title"])
            if not Event.objects.filter(slug=slug).exists():
                Event.objects.create(
                    title=data["title"],
                    slug=slug,
                    description=data["description"],
                    content=data["content"],
                    event_date=data["event_date"],
                    end_date=data["end_date"],
                    location=data["location"],
                    featured_image=data["featured_image"],
                    is_published=data["is_published"],
                )
                events_created += 1
        self.stdout.write(self.style.SUCCESS(f"✓ Created {events_created} event(s)  (skipped duplicates)"))

        # ── Gallery ────────────────────────────────────────────
        gallery_created = 0
        for data in GALLERY:
            if not GalleryItem.objects.filter(title=data["title"]).exists():
                GalleryItem.objects.create(
                    title=data["title"],
                    category=data["category"],
                    image_url=data["image_url"],
                    is_published=data["is_published"],
                    sort_order=data["sort_order"],
                )
                gallery_created += 1
        self.stdout.write(self.style.SUCCESS(f"✓ Created {gallery_created} gallery item(s)  (skipped duplicates)"))

        self.stdout.write("")
        self.stdout.write(self.style.SUCCESS(
            f"Seeding complete! "
            f"{blogs_created} blogs · {events_created} events · {gallery_created} gallery items added."
        ))
