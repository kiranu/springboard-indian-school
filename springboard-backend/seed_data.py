"""
seed_data.py — Seed blogs and events for Springboard Indian School
Run: USE_SQLITE=True python manage.py shell < seed_data.py
"""

import os, django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'springboard.settings')
os.environ['USE_SQLITE'] = 'True'
django.setup()

from apps.blog.models import Blog
from apps.events.models import Event
from datetime import date

# ─────────────────────────────────────────────
# Clear existing seed data (idempotent)
# ─────────────────────────────────────────────
Blog.objects.all().delete()
Event.objects.all().delete()
print("✓ Cleared existing blogs & events")

# ─────────────────────────────────────────────
# BLOG POSTS — 12 posts from the content calendar
# ─────────────────────────────────────────────
blogs = [
    {
        "title": "CBSE vs ICSE: Which Board is Right for Your Child in Hyderabad? (2026 Guide)",
        "category": "Admissions",
        "author": "Springboard Editorial Team",
        "excerpt": "Confused between CBSE and ICSE for your child's schooling in Hyderabad? This comprehensive guide breaks down curriculum, exam style, career paths and what Hyderabad parents are choosing in 2026.",
        "content": """<h2>CBSE vs ICSE: Making the Right Choice for Your Child</h2>
<p>Choosing the right school board is one of the most important decisions parents make for their child's education. In Hyderabad, the debate between CBSE and ICSE is very much alive. Here's everything you need to know.</p>

<h3>What is CBSE?</h3>
<p>The Central Board of Secondary Education (CBSE) is the most widely recognised school board in India, affiliated with over 25,000 schools nationwide. It is governed by the Ministry of Education and follows the National Curriculum Framework (NCF).</p>
<ul>
  <li>Standardised curriculum across India</li>
  <li>Focus on conceptual clarity and application</li>
  <li>Strong base for JEE, NEET, and UPSC preparation</li>
  <li>Ideal for families who relocate frequently</li>
</ul>

<h3>What is ICSE?</h3>
<p>The Indian Certificate of Secondary Education (ICSE) is conducted by the Council for the Indian School Certificate Examinations (CISCE). It is often considered more comprehensive and detail-oriented.</p>
<ul>
  <li>More detailed syllabus with emphasis on English language</li>
  <li>Recognised internationally — helpful for students going abroad</li>
  <li>More internal assessment and project-based evaluation</li>
</ul>

<h3>CBSE vs ICSE: A Side-by-Side Comparison</h3>
<table>
  <tr><th>Parameter</th><th>CBSE</th><th>ICSE</th></tr>
  <tr><td>Governing Body</td><td>Ministry of Education, India</td><td>CISCE (Private)</td></tr>
  <tr><td>Syllabus Depth</td><td>Moderate, focused</td><td>Comprehensive, detailed</td></tr>
  <tr><td>Language Focus</td><td>Equal emphasis on all subjects</td><td>Strong English language focus</td></tr>
  <tr><td>Exam Pattern</td><td>Objective + descriptive</td><td>Largely descriptive</td></tr>
  <tr><td>Competitive Exams</td><td>Excellent (JEE/NEET aligned)</td><td>Good, requires extra prep</td></tr>
  <tr><td>Number of Schools</td><td>25,000+ across India</td><td>2,500+ selective schools</td></tr>
</table>

<h3>What Are Hyderabad Parents Choosing in 2026?</h3>
<p>In Hyderabad, CBSE schools vastly outnumber ICSE schools, making CBSE the more accessible and practical choice for most families. The standardised nature of CBSE also means your child can transfer schools without curriculum disruption — a big advantage in today's mobile workforce.</p>

<h3>Springboard's Approach</h3>
<p>Springboard Indian School follows the CBSE curriculum, enriched with activity-based learning and 21st-century skills. Our approach ensures students are well-prepared for competitive exams while enjoying a holistic school experience.</p>
<p><strong>Ready to explore admissions? <a href="/admissions">Apply for 2026–27</a> today.</strong></p>""",
        "featured_image": "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&h=450&fit=crop",
        "meta_title": "CBSE vs ICSE: Which Board is Right for Your Child in Hyderabad? 2026 Guide",
        "meta_description": "Choosing between CBSE and ICSE in Hyderabad? Compare curriculum, exam patterns, career paths and find out what is best for your child in 2026.",
        "keywords": "CBSE vs ICSE Hyderabad, best school board Hyderabad, CBSE school Hyderabad",
    },
    {
        "title": "Top 10 Questions to Ask Before Choosing a School in Hyderabad",
        "category": "Admissions",
        "author": "Springboard Admissions Team",
        "excerpt": "School visits can be overwhelming. Use this parent-tested checklist of 10 essential questions to ask before enrolling your child in any school in Hyderabad.",
        "content": """<h2>The Smart Parent's School Checklist for Hyderabad</h2>
<p>You have shortlisted 4–5 schools. You have school visits scheduled. But do you know what to ask? Most parents leave a school tour without the answers they actually needed. Here are the 10 most important questions that will help you make a confident decision.</p>

<h3>1. What is the student-to-teacher ratio?</h3>
<p>A low ratio (ideally 20:1 or below) means your child gets personalised attention. Avoid schools with overcrowded classrooms where teachers cannot address individual learning needs.</p>

<h3>2. How is the safety infrastructure?</h3>
<p>Ask about CCTV coverage, entry/exit protocols, visitor verification, and emergency procedures. A safe campus should be non-negotiable.</p>

<h3>3. What is the school's approach to weak students?</h3>
<p>Great schools have remedial programs and don't simply pass students who need help. Ask how the school supports students who fall behind.</p>

<h3>4. What extracurricular activities are offered?</h3>
<p>A child's holistic development depends on more than academics. Look for a balanced program that includes sports, arts, music, and leadership activities.</p>

<h3>5. How does the school communicate with parents?</h3>
<p>Regular PTMs, parent portals, and open communication channels are signs of a transparent school. Ask how you will be kept informed of your child's progress.</p>

<h3>6. What is the teacher qualification and experience level?</h3>
<p>Ask about average teacher experience, B.Ed qualifications, and ongoing teacher training programs. Your child's learning depends directly on teaching quality.</p>

<h3>7. What is the fee structure — now and for future years?</h3>
<p>Ask for the complete fee structure including annual charges, activity fees, and any hidden costs. Also ask about the historical rate of fee increases.</p>

<h3>8. How does the school handle bullying and discipline?</h3>
<p>A strong anti-bullying policy and a structured disciplinary process are signs of a school that takes student welfare seriously.</p>

<h3>9. What is the school's track record?</h3>
<p>Ask about board exam results, student achievements, school awards, and alumni success stories. Past performance is a good predictor of future quality.</p>

<h3>10. Can I speak with current parents?</h3>
<p>Request to connect with 2–3 current parents for an honest, unfiltered perspective. Schools that allow this are confident in their reputation.</p>

<p><strong>At Springboard, we welcome every question. <a href="/contact">Schedule a school visit today</a> and experience the difference firsthand.</strong></p>""",
        "featured_image": "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=800&h=450&fit=crop",
        "meta_title": "Top 10 Questions to Ask Before Choosing a School in Hyderabad",
        "meta_description": "Planning school visits in Hyderabad? Use this essential checklist of 10 questions every parent should ask before enrolling their child.",
        "keywords": "school admissions checklist Hyderabad, how to choose school Hyderabad, best CBSE school Hyderabad",
    },
    {
        "title": "Why Early Childhood Education (Play Group to KG) Matters Most",
        "category": "Early Childhood",
        "author": "Dr. Meena Reddy, Academic Head",
        "excerpt": "The years from birth to age 6 are the most critical for brain development. Discover why choosing the right play school or nursery in Hyderabad can shape your child's entire future.",
        "content": """<h2>The Science Behind Early Childhood Education</h2>
<p>90% of brain development happens before the age of 6. This is not just a statistic — it is the most important fact every parent should know. The experiences, interactions, and learning environments your child encounters in these early years literally shape the neural pathways that will define their intelligence, emotional regulation, and social skills for life.</p>

<h3>What Happens in the Brain During Ages 2–6?</h3>
<p>During early childhood, the brain forms 1 million new neural connections every second. Key developmental milestones include:</p>
<ul>
  <li><strong>Language acquisition:</strong> Children absorb language at a rate that will never be repeated</li>
  <li><strong>Emotional regulation:</strong> Learning to identify and manage feelings</li>
  <li><strong>Social skills:</strong> Sharing, turn-taking, empathy, cooperation</li>
  <li><strong>Foundational numeracy and literacy:</strong> Pattern recognition, early reading readiness</li>
</ul>

<h3>Play School vs Home Environment — What the Research Says</h3>
<p>Studies consistently show that children who attend quality early childhood programs demonstrate:</p>
<ul>
  <li>Higher IQ scores by Grade 3</li>
  <li>Better language and communication skills</li>
  <li>Greater readiness for formal schooling</li>
  <li>Improved social confidence and peer relationships</li>
</ul>

<h3>What to Look For in a Play School in Hyderabad</h3>
<p>Not all play schools are equal. Look for:</p>
<ul>
  <li>Qualified early childhood educators (not just caregivers)</li>
  <li>Structured play combined with free exploration</li>
  <li>Low adult-to-child ratio (1:8 or better for Play Group)</li>
  <li>Safe, clean, stimulating environment</li>
  <li>Regular parent communication and involvement</li>
</ul>

<h3>The Springboard Early Years Program</h3>
<p>At Springboard Indian School, our Play Group and Nursery programs are designed by early childhood specialists. We use a blend of Montessori-inspired materials, structured storytelling, sensory play, and music to ensure every child's early years are joyful and developmentally optimal.</p>
<p><strong><a href="/admissions">Enquire about Play Group and Nursery admissions</a> for 2026–27.</strong></p>""",
        "featured_image": "https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=800&h=450&fit=crop",
        "meta_title": "Why Early Childhood Education (Play Group to KG) Matters Most | Hyderabad",
        "meta_description": "90% of brain development happens before age 6. Learn why early childhood education in Hyderabad matters and what to look for in a play school.",
        "keywords": "early childhood education Hyderabad, play school Hyderabad, nursery school Hyderabad",
    },
    {
        "title": "What is Activity-Based Learning? How Springboard Does It Differently",
        "category": "Teaching Methodology",
        "author": "Springboard Academic Team",
        "excerpt": "Activity-Based Learning (ABL) is more than a teaching method — it is a philosophy that transforms how children relate to knowledge. Here is how Springboard implements it across every grade.",
        "content": """<h2>Activity-Based Learning: Beyond the Textbook</h2>
<p>Walk into a traditional classroom and you will see rows of desks, a teacher at the front, and students copying notes. Walk into a Springboard classroom and you will see something completely different — children building bridges with straws, measuring rainfall in the school garden, acting out historical events, and debating solutions to real-world problems.</p>

<h3>What Exactly is Activity-Based Learning?</h3>
<p>Activity-Based Learning (ABL) is an educational approach where students learn by doing — through hands-on activities, experiments, projects, and real-world problem solving — rather than passive instruction and memorisation.</p>

<h3>The ABL Framework at Springboard</h3>
<p>We apply ABL differently across our three learning stages:</p>

<h4>Play Group to KG (Ages 2.5–6)</h4>
<ul>
  <li>Sensory bins and tactile materials for numeracy and literacy</li>
  <li>Role play and dramatic storytelling for language development</li>
  <li>Music, movement, and rhythm for cognitive development</li>
  <li>Nature walks and outdoor exploration for science readiness</li>
</ul>

<h4>Grade 1–4 (Ages 6–10)</h4>
<ul>
  <li>Hands-on science experiments in our junior lab</li>
  <li>Math manipulatives — blocks, counters, measurement tools</li>
  <li>Art-integrated learning across all subjects</li>
  <li>Group projects that build collaboration skills</li>
</ul>

<h4>Grade 5–7 (Ages 10–13)</h4>
<ul>
  <li>Full science laboratory sessions</li>
  <li>Debate and public speaking programs</li>
  <li>Social studies through field trips and simulations</li>
  <li>Technology projects using our computer lab</li>
</ul>

<h3>The Results Speak for Themselves</h3>
<p>Students taught through activity-based methods demonstrate 40% better retention, stronger critical thinking, and significantly higher engagement levels compared to traditional instruction. More importantly, they love school.</p>

<p><strong>Come visit our campus and see ABL in action. <a href="/contact">Book a school tour</a> today.</strong></p>""",
        "featured_image": "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800&h=450&fit=crop",
        "meta_title": "What is Activity-Based Learning? How Springboard School Hyderabad Does It Differently",
        "meta_description": "Activity-Based Learning transforms education. Discover how Springboard Indian School Hyderabad implements ABL from Play Group to Grade 7.",
        "keywords": "activity based learning school Hyderabad, ABL school Hyderabad, best CBSE school teaching method",
    },
    {
        "title": "School Safety Standards: What Every Parent in Hyderabad Should Know",
        "category": "Safety & Campus",
        "author": "Springboard Safety Committee",
        "excerpt": "From CCTV coverage to background checks and emergency drills — here is the complete guide to what school safety standards should look like in Hyderabad, and how Springboard measures up.",
        "content": """<h2>School Safety: The Non-Negotiable Standard for Hyderabad Parents</h2>
<p>In recent years, school safety has become the primary concern for parents choosing a school. Beyond academics and facilities, parents want to know: Is my child truly safe? Here is what genuine school safety looks like — and the questions you should ask.</p>

<h3>1. CCTV Coverage</h3>
<p>A safe campus has complete CCTV coverage with no blind spots — including classrooms, corridors, playgrounds, entry/exit points, and toilets (common areas, not inside). Footage should be stored for a minimum of 30 days.</p>
<p><strong>At Springboard:</strong> Our entire campus is monitored 24/7 with IP cameras. Footage is accessible to management and shared with parents in case of incidents.</p>

<h3>2. Access Control</h3>
<p>Visitors should not be able to walk freely into a school campus. Look for:</p>
<ul>
  <li>Biometric or ID-based entry for staff</li>
  <li>Visitor registration and photo ID verification</li>
  <li>Child release only to authorised persons</li>
  <li>Secure compound with controlled entry/exit</li>
</ul>

<h3>3. Staff Background Verification</h3>
<p>Every staff member — teachers, support staff, bus drivers, and helpers — should undergo police verification before joining. This is mandatory but unfortunately not universally followed.</p>

<h3>4. Emergency Preparedness</h3>
<p>Regular fire drills, earthquake drills, and medical emergency protocols should be part of every school's safety calendar. Staff should be trained in first aid and emergency response.</p>

<h3>5. Anti-Bullying Policy</h3>
<p>A written anti-bullying policy with clear reporting mechanisms and consequences is a sign of a school that takes social safety as seriously as physical safety. Ask to see the policy during your school visit.</p>

<h3>6. Medical Facilities</h3>
<p>A dedicated medical room with a qualified nurse or first-aider, basic medication, and emergency contact protocols is essential — especially for schools with young children.</p>

<h3>Springboard's Safety Promise</h3>
<p>Every child at Springboard is protected by a comprehensive safety framework built on prevention, monitoring, and response. We believe safety is not a feature — it is a foundation.</p>
<p><strong><a href="/facilities">See our facilities</a> or <a href="/contact">book a campus visit</a> to see our safety standards firsthand.</strong></p>""",
        "featured_image": "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800&h=450&fit=crop",
        "meta_title": "School Safety Standards: What Every Parent in Hyderabad Should Know",
        "meta_description": "From CCTV to background checks — learn what genuine school safety looks like in Hyderabad and the questions every parent should ask on a school visit.",
        "keywords": "safe school Hyderabad, CCTV school Hyderabad, school safety standards India",
    },
    {
        "title": "How to Prepare Your Child for Class 1 Admissions in Hyderabad",
        "category": "Admissions",
        "author": "Springboard Admissions Team",
        "excerpt": "Class 1 admission season in Hyderabad is competitive and can be stressful for parents. This guide gives you a practical timeline and preparation checklist to give your child the best start.",
        "content": """<h2>Class 1 Admissions in Hyderabad: A Parent's Complete Preparation Guide</h2>
<p>Class 1 is one of the most significant transitions in a child's educational journey — from the structured play of KG to the formal learning environment of primary school. Preparing well makes all the difference.</p>

<h3>When to Start Preparing</h3>
<p>Begin at least 6 months before the admissions season (October–November for the following academic year starting June). This gives you time to:</p>
<ul>
  <li>Research and shortlist schools</li>
  <li>Prepare documents</li>
  <li>Work on your child's readiness</li>
</ul>

<h3>Academic Readiness Checklist for Class 1</h3>
<p>Most CBSE schools in Hyderabad look for the following in a Class 1 candidate:</p>
<ul>
  <li>Recognition of all 26 letters (upper and lower case)</li>
  <li>Numbers 1–100 recognition and basic counting</li>
  <li>Simple addition and subtraction (1–20)</li>
  <li>Ability to write their own name</li>
  <li>Basic vocabulary in English (colours, shapes, animals, fruits)</li>
  <li>Following 2–3 step instructions</li>
</ul>

<h3>Social and Emotional Readiness</h3>
<p>Academics are just one part. Schools also look for:</p>
<ul>
  <li>Ability to sit focused for 20–30 minutes</li>
  <li>Comfortable separating from parents</li>
  <li>Can share and interact with peers</li>
  <li>Basic self-care — using the toilet independently, opening a lunch box</li>
</ul>

<h3>Documents Typically Required</h3>
<ul>
  <li>Birth certificate</li>
  <li>KG transfer certificate and report card</li>
  <li>Passport-size photographs</li>
  <li>Proof of residence</li>
  <li>Parent/Guardian Aadhaar card</li>
</ul>

<h3>The Interaction Session — What to Expect</h3>
<p>Most Hyderabad schools conduct a friendly interaction (not an entrance test) for Class 1. It is typically 15–20 minutes with the child and sometimes the parents. Coaches your child to speak confidently, answer simple questions, and feel comfortable with new adults.</p>

<p><strong>Ready to apply? <a href="/admissions">Check out our Class 1 admissions</a> at Springboard Indian School.</strong></p>""",
        "featured_image": "https://images.unsplash.com/photo-1620912189865-1e8a33da4caf?q=80&w=800&h=450&fit=crop",
        "meta_title": "How to Prepare Your Child for Class 1 Admissions in Hyderabad | 2026 Guide",
        "meta_description": "Class 1 admission preparation guide for Hyderabad parents. Academic checklist, document list, interaction tips and timeline for 2026 admissions.",
        "keywords": "class 1 admission Hyderabad 2026, school admission preparation, CBSE class 1 Hyderabad",
    },
    {
        "title": "CBSE Curriculum Explained: Grade 1–7 Overview for Hyderabad Parents",
        "category": "Academics",
        "author": "Springboard Academic Team",
        "excerpt": "What exactly does your child study under the CBSE curriculum from Grade 1 to Grade 7? This complete breakdown helps Hyderabad parents understand what to expect at every stage.",
        "content": """<h2>Understanding the CBSE Curriculum: Grade 1 to Grade 7</h2>
<p>The CBSE (Central Board of Secondary Education) curriculum is one of India's most comprehensive and well-researched education frameworks. Here is a clear breakdown of what your child will study at each stage — from the curious first-grader to the emerging teenager in Grade 7.</p>

<h3>Grade 1–2: Foundation Years</h3>
<p><strong>Core Subjects:</strong> English, Hindi, Mathematics, Environmental Studies (EVS)</p>
<p>Focus on literacy, numeracy, and basic environmental awareness. Learning is primarily through stories, activities, and play-based methods. No formal exam pressure — continuous comprehensive evaluation (CCE) is used.</p>

<h3>Grade 3–5: Primary Years</h3>
<p><strong>Core Subjects:</strong> English, Hindi, Mathematics, EVS/Science, Social Studies, Computer (from Grade 4)</p>
<p>Concepts become more structured. Introduction to formal writing, fractions, India's geography and history, and basic computer literacy. Activities, projects, and oral assessments complement written exams.</p>

<h3>Grade 6–7: Middle Years</h3>
<p><strong>Core Subjects:</strong> English, Hindi, Mathematics, Science, Social Science (History/Geography/Civics), Computer Science</p>
<p>Subject specialisation begins. Science divides into Physics, Chemistry, and Biology concepts. Social Science introduces governance, economics, and world history. Critical thinking and analytical writing become key skills.</p>

<h3>CBSE's New Education Policy Alignment (NEP 2020)</h3>
<p>CBSE has been progressively aligning with the National Education Policy 2020, which emphasises:</p>
<ul>
  <li>Reducing rote memorisation in favour of conceptual understanding</li>
  <li>Competency-based assessments</li>
  <li>Integration of arts, sports, and vocational skills</li>
  <li>Mother tongue instruction in early grades</li>
</ul>

<h3>How Springboard Enriches the CBSE Curriculum</h3>
<p>At Springboard, we follow CBSE as our foundation but we go significantly beyond it. Our students receive:</p>
<ul>
  <li>Science lab sessions from Grade 1 (not just Grade 6+)</li>
  <li>Digital literacy and coding from Grade 3</li>
  <li>Art integration across all core subjects</li>
  <li>Weekly spoken English and debate sessions</li>
</ul>

<p><strong>Want to see our curriculum in action? <a href="/academics">Explore our academics</a> or <a href="/contact">schedule a visit</a>.</strong></p>""",
        "featured_image": "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=800&h=450&fit=crop",
        "meta_title": "CBSE Curriculum Explained: Grade 1–7 Overview for Hyderabad Parents",
        "meta_description": "Complete breakdown of the CBSE curriculum from Grade 1 to Grade 7. Understand subjects, learning approach and what to expect at each stage.",
        "keywords": "CBSE curriculum grades Hyderabad, what is CBSE syllabus, CBSE school Hyderabad",
    },
    {
        "title": "Admissions 2026–27 at Springboard: Dates, Process & Eligibility",
        "category": "Admissions",
        "author": "Springboard Admissions Office",
        "excerpt": "Admissions for the academic year 2026–27 are now open at Springboard Indian School, Hyderabad. Here are the important dates, eligibility criteria, step-by-step process and documents required.",
        "content": """<h2>Admissions 2026–27: Apply Now at Springboard Indian School</h2>
<p>We are pleased to announce that admissions for the academic year 2026–27 are now open at Springboard Indian School, Hyderabad. We welcome applications for all grades from Play Group (age 2.5 years) through Grade 7.</p>

<div style="background:#fff3cd; padding:16px; border-radius:8px; border-left:4px solid #f59e0b; margin:20px 0;">
<strong>⚠️ Important Notice:</strong> Seats are filling fast — especially for Nursery, KG, and Grade 1. We strongly recommend applying early to secure your child's place.
</div>

<h3>Grade-Wise Seat Availability</h3>
<table>
  <tr><th>Grade</th><th>Age Requirement (as of June 1)</th><th>Seats Available</th><th>Status</th></tr>
  <tr><td>Play Group</td><td>2.5 – 3.5 years</td><td>25</td><td>🟢 Open</td></tr>
  <tr><td>Nursery</td><td>3.5 – 4.5 years</td><td>30</td><td>🟡 Limited</td></tr>
  <tr><td>LKG</td><td>4.5 – 5.5 years</td><td>30</td><td>🟢 Open</td></tr>
  <tr><td>UKG</td><td>5.5 – 6.5 years</td><td>25</td><td>🟢 Open</td></tr>
  <tr><td>Grade 1</td><td>6.5 years+</td><td>20</td><td>🟡 Limited</td></tr>
  <tr><td>Grades 2–7</td><td>Age appropriate</td><td>15 per class</td><td>🟢 Select Seats</td></tr>
</table>

<h3>The 4-Step Admission Process</h3>
<ol>
  <li><strong>Submit Online Enquiry</strong> — Fill out the form on our Admissions page. Takes 2 minutes. Our team will call you within 24 hours.</li>
  <li><strong>Schedule a School Visit</strong> — Visit our campus, meet the teachers, see the facilities, and feel the Springboard difference firsthand.</li>
  <li><strong>Submit Application & Documents</strong> — Complete the admission form with required documents (see list below).</li>
  <li><strong>Confirmation & Fee Payment</strong> — Receive your offer letter, pay the initial fees, and welcome to the Springboard family!</li>
</ol>

<h3>Documents Required</h3>
<ul>
  <li>Child's Birth Certificate (original + photocopy)</li>
  <li>2 recent passport-size photographs of the child</li>
  <li>Previous school Transfer Certificate (Grade 2 and above)</li>
  <li>Previous year's report card (Grade 2 and above)</li>
  <li>Proof of residence (Aadhaar card / utility bill)</li>
  <li>Parent/Guardian Aadhaar card (photocopy)</li>
  <li>Immunisation/vaccination record</li>
</ul>

<h3>Key Dates for 2026–27</h3>
<ul>
  <li><strong>Application Open:</strong> January 2026</li>
  <li><strong>Interaction Sessions:</strong> February – March 2026</li>
  <li><strong>Admission Confirmation:</strong> March – April 2026</li>
  <li><strong>Fee Payment Deadline:</strong> April 30, 2026</li>
  <li><strong>Academic Year Begins:</strong> June 2026</li>
</ul>

<p><strong><a href="/admissions">Apply now for 2026–27 admissions</a> — limited seats available.</strong></p>""",
        "featured_image": "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&h=450&fit=crop",
        "meta_title": "Admissions 2026–27 Open | Springboard Indian School Hyderabad — Apply Now",
        "meta_description": "Springboard Indian School Hyderabad admissions for 2026–27 are now open. Dates, process, eligibility, documents and grade-wise seat availability.",
        "keywords": "Springboard school admissions 2026, CBSE school admission Hyderabad 2026, school admission open Hyderabad",
    },
    {
        "title": "The Importance of Mother Tongue + English Balance in Early Schooling",
        "category": "Teaching Methodology",
        "author": "Dr. Meena Reddy, Academic Head",
        "excerpt": "Research shows bilingual children have stronger cognitive skills. Here is why maintaining mother tongue alongside English is vital in your child's early school years — and how Springboard achieves this balance.",
        "content": """<h2>Bilingual Education: Why Mother Tongue Matters in English-Medium Schools</h2>
<p>As Hyderabad becomes increasingly cosmopolitan, there is growing pressure on parents to prioritise English from day one of schooling. But research from leading educational institutions consistently tells a different story: children who maintain strong mother tongue skills alongside English become better learners in both languages.</p>

<h3>The Cognitive Science Behind Bilingualism</h3>
<p>Studies by the University of Edinburgh and India's NCERT show that bilingual children:</p>
<ul>
  <li>Develop superior executive function (focus, task-switching, problem-solving)</li>
  <li>Show higher metalinguistic awareness — understanding how language works</li>
  <li>Demonstrate greater empathy and cultural intelligence</li>
  <li>Achieve higher scores in reading comprehension in both languages</li>
</ul>

<h3>The Problem with 'English Only' Schools</h3>
<p>When children are discouraged from using their mother tongue at school, they face a phenomenon called "subtractive bilingualism" — where English is gained at the cost of the home language. This disconnects children from family, culture, and their own identity.</p>

<h3>The CBSE Three-Language Formula</h3>
<p>CBSE's three-language policy was designed to address exactly this. Under it, students study:</p>
<ul>
  <li><strong>Language 1:</strong> English (medium of instruction)</li>
  <li><strong>Language 2:</strong> Hindi (national language)</li>
  <li><strong>Language 3:</strong> Regional language (Telugu in Hyderabad)</li>
</ul>

<h3>How Springboard Implements Language Balance</h3>
<p>At Springboard, we follow the three-language formula rigorously while also:</p>
<ul>
  <li>Using bilingual storytelling in lower grades (English + Telugu)</li>
  <li>Celebrating regional language days and cultural events</li>
  <li>Encouraging parents to read in the home language alongside English</li>
  <li>Running dedicated spoken English programs without suppressing mother tongue</li>
</ul>

<p><strong>Discover more about our academic philosophy at <a href="/academics">our Academics page</a>.</strong></p>""",
        "featured_image": "https://images.unsplash.com/photo-1503676382389-4809596d5290?q=80&w=800&h=450&fit=crop",
        "meta_title": "Mother Tongue + English Balance in Early Schooling | Bilingual Education Hyderabad",
        "meta_description": "Bilingual children are better learners. Discover why maintaining mother tongue alongside English matters in early schooling and how Springboard achieves the balance.",
        "keywords": "bilingual education Hyderabad school, mother tongue school Hyderabad, CBSE three language formula",
    },
    {
        "title": "Co-Curricular vs Extra-Curricular: Why Both Matter for Child Development",
        "category": "Academics",
        "author": "Springboard Editorial Team",
        "excerpt": "Many parents confuse co-curricular and extra-curricular activities. Here is the important difference — and why the best schools in Hyderabad ensure children participate in both.",
        "content": """<h2>Co-Curricular vs Extra-Curricular Activities: What Every Parent Should Know</h2>
<p>If you have been researching schools in Hyderabad, you have likely come across both terms. But what exactly is the difference between co-curricular and extra-curricular activities — and why does it matter for your child?</p>

<h3>What are Co-Curricular Activities?</h3>
<p>Co-curricular activities are those that <strong>directly complement and extend the academic curriculum</strong>. They happen during or alongside school hours and are considered part of the overall learning program. Examples include:</p>
<ul>
  <li>Science exhibitions and lab experiments</li>
  <li>Debate and public speaking competitions</li>
  <li>Art and craft projects tied to subject learning</li>
  <li>School plays and drama that teach literature</li>
  <li>Maths olympiads and quiz competitions</li>
</ul>

<h3>What are Extra-Curricular Activities?</h3>
<p>Extra-curricular activities are those that go <strong>beyond the academic curriculum</strong> — they develop personality, physical fitness, and creative skills. They are typically optional or offered outside regular class time. Examples include:</p>
<ul>
  <li>Cricket, football, basketball, athletics</li>
  <li>Classical dance, Western dance, folk dance</li>
  <li>Music — vocal, keyboard, guitar, tabla</li>
  <li>Painting, clay modelling, origami</li>
  <li>Yoga, karate, swimming</li>
</ul>

<h3>Why Both Are Essential</h3>
<p>Co-curricular activities deepen academic understanding and make learning meaningful. Extra-curricular activities build confidence, physical health, creativity, and teamwork — the "soft skills" that increasingly determine success in life and career.</p>
<p>Research from Harvard's Project Zero shows that students who participate in regular arts and sports programs achieve 20% higher academic outcomes and demonstrate stronger leadership potential.</p>

<h3>At Springboard</h3>
<p>We have structured both co-curricular and extra-curricular programs as integral parts of our school day — not as afterthoughts. Every student participates in at least 3 activities per week beyond core academics.</p>

<p><strong>Explore our full programs at <a href="/academics">Academics</a> and <a href="/facilities">Facilities</a>.</strong></p>""",
        "featured_image": "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&h=450&fit=crop",
        "meta_title": "Co-Curricular vs Extra-Curricular Activities: Why Both Matter for Child Development",
        "meta_description": "Understand the difference between co-curricular and extra-curricular activities and why both are essential for your child's holistic development.",
        "keywords": "co-curricular activities school, extracurricular activities CBSE school Hyderabad, child development school",
    },
]

created_blogs = 0
for b in blogs:
    obj = Blog.objects.create(
        title=b["title"],
        category=b.get("category", "School Life"),
        author=b.get("author", "Springboard Team"),
        excerpt=b["excerpt"],
        content=b["content"],
        featured_image=b.get("featured_image", ""),
        meta_title=b.get("meta_title", ""),
        meta_description=b.get("meta_description", ""),
        keywords=b.get("keywords", ""),
        is_published=True,
    )
    created_blogs += 1
    print(f"  ✓ Blog: {obj.title[:60]}...")

print(f"\n✅ Created {created_blogs} blog posts\n")

# ─────────────────────────────────────────────
# EVENTS — 8 school events across the academic year
# ─────────────────────────────────────────────
events = [
    {
        "title": "Annual Sports Day 2025–26",
        "description": "Springboard's Annual Sports Day — a day of athletic excellence, team spirit, and joyful competition for students from Play Group to Grade 7.",
        "content": """<h2>Annual Sports Day 2025–26</h2>
<p>One of the most eagerly awaited events in the Springboard calendar — our Annual Sports Day brings the entire school community together for a day of athletic excellence, friendly competition, and boundless energy.</p>

<h3>Event Highlights</h3>
<ul>
  <li>Track & field events for all grades</li>
  <li>Relay races, obstacle courses, and sack races</li>
  <li>Yoga and mass drill demonstration by Grade 5–7</li>
  <li>Special events for Play Group and Nursery (fun runs and balloon games)</li>
  <li>Prize distribution and trophy ceremony</li>
  <li>Cultural performances and school march-past</li>
</ul>

<h3>Schedule</h3>
<p><strong>8:00 AM:</strong> Assembly & Flag Hoisting | <strong>8:30 AM:</strong> March Past | <strong>9:00 AM:</strong> Events Begin | <strong>12:30 PM:</strong> Prize Distribution & Closing</p>

<p>Parents are warmly invited to attend and cheer for their children. Entry is by school ID card. Photography is permitted from the designated parent area.</p>""",
        "event_date": date(2026, 1, 15),
        "end_date": date(2026, 1, 15),
        "location": "Springboard School Grounds, Hyderabad",
        "featured_image": "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=800&h=450&fit=crop",
        "meta_title": "Annual Sports Day 2025–26 | Springboard Indian School Hyderabad",
        "meta_description": "Join us for Springboard Indian School's Annual Sports Day — track events, relay races, yoga displays and prize distribution. All parents welcome.",
        "keywords": "annual sports day school Hyderabad, school sports event, Springboard sports day",
        "geo_region": "IN-TG",
        "geo_placename": "Hyderabad",
    },
    {
        "title": "Science & Innovation Exhibition 2025",
        "description": "Students from Grade 3 to Grade 7 showcase their scientific curiosity through original experiments, models, and innovative projects at our annual Science Exhibition.",
        "content": """<h2>Science & Innovation Exhibition 2025</h2>
<p>For one exciting day, our school transforms into a science fair of ideas, inventions, and discoveries. The Springboard Science & Innovation Exhibition gives students a platform to think, create, and communicate their scientific ideas to the world.</p>

<h3>What to Expect</h3>
<ul>
  <li>50+ student projects across Physics, Chemistry, Biology, and Environmental Science</li>
  <li>Working models and interactive demonstrations</li>
  <li>Junior category (Grade 3–5) and Senior category (Grade 6–7)</li>
  <li>Guest judges from local engineering and science institutions</li>
  <li>Best Project Trophy and Innovation Award</li>
</ul>

<h3>Past Winning Projects</h3>
<ul>
  <li>"Solar Water Purifier" — Grade 7 team</li>
  <li>"Micro-Plastic Detection in Water" — Grade 6</li>
  <li>"Earthquake-Resistant Building Model" — Grade 5</li>
</ul>

<p>All parents and community members are invited to visit the exhibition between 10:00 AM and 1:00 PM. Let your child's curiosity inspire you!</p>""",
        "event_date": date(2025, 10, 18),
        "end_date": date(2025, 10, 18),
        "location": "Springboard School Hall, Hyderabad",
        "featured_image": "https://images.unsplash.com/photo-1532094349884-543559c93c3e?q=80&w=800&h=450&fit=crop",
        "meta_title": "Science & Innovation Exhibition 2025 | Springboard Indian School",
        "meta_description": "50+ student science projects on display. Join Springboard Indian School's annual Science & Innovation Exhibition on October 18, 2025.",
        "keywords": "science exhibition school Hyderabad, school science fair, innovation exhibition Hyderabad",
        "geo_region": "IN-TG",
        "geo_placename": "Hyderabad",
    },
    {
        "title": "Cultural Festival — Utsav 2025",
        "description": "Utsav, Springboard's grand annual cultural festival, celebrates India's rich diversity through music, dance, drama, and art from every region and tradition.",
        "content": """<h2>Utsav 2025 — A Celebration of Culture, Creativity & India</h2>
<p>Utsav is not just a school event — it is a celebration of everything that makes India beautiful. Our students spend weeks preparing performances that showcase classical and folk traditions from across the country.</p>

<h3>Programme Highlights</h3>
<ul>
  <li>Classical Bharatanatyam performance by Grade 6 girls</li>
  <li>Rajasthani folk dance — Grade 4 & 5</li>
  <li>Orchestral music performance — School Band</li>
  <li>Mime and drama — "The Journey of India" (Grade 7)</li>
  <li>Regional costume parade representing all Indian states</li>
  <li>Traditional art exhibition — Warli, Madhubani, Kolam</li>
  <li>Food stalls celebrating regional Indian cuisines</li>
</ul>

<h3>Chief Guest</h3>
<p>We are honoured to welcome a distinguished member of the Hyderabad cultural community as our Chief Guest for Utsav 2025.</p>

<p>Tickets are available from the school reception. All proceeds support the school's arts development fund.</p>""",
        "event_date": date(2025, 11, 22),
        "end_date": date(2025, 11, 22),
        "location": "Springboard School Auditorium, Hyderabad",
        "featured_image": "https://images.unsplash.com/photo-1516627145497-19a584348fa9?q=80&w=800&h=450&fit=crop",
        "meta_title": "Utsav 2025 — Annual Cultural Festival | Springboard Indian School Hyderabad",
        "meta_description": "Experience Springboard's grand cultural festival Utsav 2025 — classical dance, music, drama and regional art from across India. November 22, 2025.",
        "keywords": "school cultural festival Hyderabad, annual day school, Utsav school event Hyderabad",
        "geo_region": "IN-TG",
        "geo_placename": "Hyderabad",
    },
    {
        "title": "Republic Day Celebrations 2026",
        "description": "Join us as Springboard Indian School celebrates the 77th Republic Day of India with flag hoisting, patriotic performances, and a special assembly.",
        "content": """<h2>Republic Day 2026 at Springboard Indian School</h2>
<p>Every year, Springboard Indian School celebrates Republic Day with deep patriotism and pride. The event reminds our students of the values of democracy, unity, and the remarkable journey of our nation.</p>

<h3>Programme</h3>
<ul>
  <li>Flag hoisting ceremony by the School Principal</li>
  <li>National Anthem sung by the entire school community</li>
  <li>Patriotic song performances by the school choir</li>
  <li>Short plays depicting episodes from India's freedom struggle</li>
  <li>Speech competition winners' addresses</li>
  <li>Distribution of sweets to all students</li>
</ul>

<p>Parents are cordially invited to join the flag hoisting ceremony at 8:00 AM. The full programme concludes by 10:00 AM.</p>""",
        "event_date": date(2026, 1, 26),
        "end_date": date(2026, 1, 26),
        "location": "Springboard School Grounds, Hyderabad",
        "featured_image": "https://images.unsplash.com/photo-1532375810709-75b1da00537c?q=80&w=800&h=450&fit=crop",
        "meta_title": "Republic Day Celebrations 2026 | Springboard Indian School Hyderabad",
        "meta_description": "Springboard Indian School celebrates Republic Day 2026 with flag hoisting, patriotic performances and a special assembly. Parents welcome.",
        "keywords": "Republic Day school Hyderabad, school patriotic event, Republic Day celebration Hyderabad 2026",
        "geo_region": "IN-TG",
        "geo_placename": "Hyderabad",
    },
    {
        "title": "Parent-Teacher Meeting — Term 1 Results",
        "description": "Term 1 PTM for all grades — parents are invited to meet subject teachers, review their child's academic progress, and discuss areas for improvement.",
        "content": """<h2>Parent-Teacher Meeting — Term 1 Assessment Review</h2>
<p>The Term 1 Parent-Teacher Meeting is a critical milestone in the academic year. It is an opportunity for parents to gain a complete understanding of their child's progress, strengths, and areas for growth from the teachers who work with them every day.</p>

<h3>Schedule</h3>
<ul>
  <li><strong>9:00 AM – 10:30 AM:</strong> Play Group, Nursery, KG</li>
  <li><strong>10:30 AM – 12:00 PM:</strong> Grade 1, 2, 3</li>
  <li><strong>12:00 PM – 1:30 PM:</strong> Grade 4, 5</li>
  <li><strong>2:00 PM – 3:30 PM:</strong> Grade 6, 7</li>
</ul>

<h3>What to Expect</h3>
<ul>
  <li>Individual 10-minute session with class teacher</li>
  <li>Subject teacher consultations (open booth format)</li>
  <li>Report card distribution</li>
  <li>Counselling sessions available on request</li>
</ul>

<p>Please carry your parent ID card for entry. No prior appointment needed — slots are on a first-come, first-served basis.</p>""",
        "event_date": date(2025, 10, 4),
        "end_date": date(2025, 10, 4),
        "location": "All Classrooms — Springboard Indian School, Hyderabad",
        "featured_image": "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?q=80&w=800&h=450&fit=crop",
        "meta_title": "Parent-Teacher Meeting Term 1 | Springboard Indian School Hyderabad",
        "meta_description": "Term 1 PTM at Springboard Indian School. Meet your child's teachers, review progress reports, and discuss academic goals for the year.",
        "keywords": "parent teacher meeting school Hyderabad, PTM school, term 1 results school",
        "geo_region": "IN-TG",
        "geo_placename": "Hyderabad",
    },
    {
        "title": "Admissions Open House — 2026–27",
        "description": "Prospective parents are invited to our Open House event for 2026–27 admissions — tour the campus, meet the teachers, and learn everything about Springboard.",
        "content": """<h2>Open House 2026–27 — Visit Springboard Indian School</h2>
<p>We warmly invite parents and families to our upcoming Open House — the perfect opportunity to experience the Springboard difference firsthand before making your admission decision.</p>

<h3>What's Included</h3>
<ul>
  <li>Guided campus tour with school prefects</li>
  <li>Meet and greet with the Principal and senior faculty</li>
  <li>Live classroom demonstrations across grades</li>
  <li>Q&A session with the Admissions team</li>
  <li>Fee structure and scholarship information</li>
  <li>Student art exhibition and musical performance</li>
  <li>Complimentary refreshments</li>
</ul>

<h3>Registration</h3>
<p>Registration is free but preferred for planning purposes. Please register via our website or call the admissions office on +91-40-XXXXXXXX.</p>

<p>We look forward to welcoming you to the Springboard family. <a href="/admissions">Register for the Open House today.</a></p>""",
        "event_date": date(2026, 2, 7),
        "end_date": date(2026, 2, 7),
        "location": "Springboard Indian School Campus, Hyderabad",
        "featured_image": "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&h=450&fit=crop",
        "meta_title": "Admissions Open House 2026–27 | Springboard Indian School Hyderabad",
        "meta_description": "Visit Springboard Indian School for our Admissions Open House. Campus tour, meet teachers, Q&A session and more. Free entry — register now.",
        "keywords": "school open house Hyderabad, school admission event 2026, Springboard school visit",
        "geo_region": "IN-TG",
        "geo_placename": "Hyderabad",
    },
    {
        "title": "Annual Day & Prize Distribution Ceremony 2026",
        "description": "The grandest event of the academic year — Annual Day celebrates student achievements with performances, award ceremony, and the Chief Guest address.",
        "content": """<h2>Annual Day 2026 — Celebrating Excellence & Achievement</h2>
<p>Annual Day is the most anticipated event in the Springboard calendar — a grand celebration of every student's growth, effort, and achievement over the year. It is an evening of performances, pride, and community.</p>

<h3>Programme Highlights</h3>
<ul>
  <li>Welcome address by the Principal</li>
  <li>Chief Guest address and lamp lighting ceremony</li>
  <li>Dance performances — classical, folk, and contemporary</li>
  <li>School choir — patriotic and Bollywood medley</li>
  <li>Drama — original play written and directed by Grade 7 students</li>
  <li>Academic Excellence Awards — toppers from every grade</li>
  <li>Sportsperson of the Year, Artist of the Year, Leader of the Year</li>
  <li>Special recognition — Most Improved Student</li>
  <li>Vote of thanks and school anthem</li>
</ul>

<h3>Venue & Timing</h3>
<p>The event will be held at a local auditorium in Hyderabad. Gates open at 5:30 PM. Programme begins at 6:00 PM sharp. Formal dress code requested for parents.</p>

<p>Invitation cards will be distributed to all families through the school diary. Kindly RSVP by March 1, 2026.</p>""",
        "event_date": date(2026, 3, 14),
        "end_date": date(2026, 3, 14),
        "location": "Shilpakala Vedika, Hyderabad",
        "featured_image": "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&h=450&fit=crop",
        "meta_title": "Annual Day & Prize Distribution 2026 | Springboard Indian School Hyderabad",
        "meta_description": "Join us for Springboard Indian School's Annual Day 2026 — performances, academic awards, sports trophies, and prize distribution. All parents invited.",
        "keywords": "annual day school Hyderabad, prize distribution school, school annual function 2026",
        "geo_region": "IN-TG",
        "geo_placename": "Hyderabad",
    },
    {
        "title": "Independence Day Celebrations 2025",
        "description": "Springboard Indian School celebrates the 79th Independence Day with flag hoisting, patriotic songs, skits, and a special address by the Principal.",
        "content": """<h2>Independence Day 2025 — Jai Hind!</h2>
<p>On this proud occasion of India's 79th Independence Day, Springboard Indian School celebrates our nation's freedom, progress, and the values of democracy, secularism, and unity.</p>

<h3>Programme</h3>
<ul>
  <li>Flag Hoisting by the School Principal — 8:00 AM</li>
  <li>National Anthem by the entire school community</li>
  <li>Patriotic songs by the school choir</li>
  <li>Short skit — "India's Journey: 1947 to 2025"</li>
  <li>Speech by student representative</li>
  <li>Principal's address</li>
  <li>Distribution of national flag pins and sweets</li>
</ul>

<p>All parents are welcome to join the flag hoisting ceremony at 8:00 AM. Come dressed in the colours of our flag — orange, white, or green!</p>""",
        "event_date": date(2025, 8, 15),
        "end_date": date(2025, 8, 15),
        "location": "Springboard School Grounds, Hyderabad",
        "featured_image": "https://images.unsplash.com/photo-1532375810709-75b1da00537c?q=80&w=800&h=450&fit=crop",
        "meta_title": "Independence Day Celebrations 2025 | Springboard Indian School Hyderabad",
        "meta_description": "Springboard Indian School celebrates India's 79th Independence Day with flag hoisting, patriotic performances and special assembly. August 15, 2025.",
        "keywords": "Independence Day school Hyderabad, school patriotic event August 15, school Independence Day celebration",
        "geo_region": "IN-TG",
        "geo_placename": "Hyderabad",
    },
]

created_events = 0
for e in events:
    obj = Event.objects.create(
        title=e["title"],
        description=e["description"],
        content=e["content"],
        event_date=e["event_date"],
        end_date=e.get("end_date"),
        location=e["location"],
        featured_image=e.get("featured_image", ""),
        meta_title=e.get("meta_title", ""),
        meta_description=e.get("meta_description", ""),
        keywords=e.get("keywords", ""),
        geo_region=e.get("geo_region", "IN-TG"),
        geo_placename=e.get("geo_placename", "Hyderabad"),
        is_published=True,
    )
    created_events += 1
    print(f"  ✓ Event: {obj.title[:60]}...")

print(f"\n✅ Created {created_events} events")
print("\n🎉 Seeding complete!")
print(f"   Blogs  : {created_blogs}")
print(f"   Events : {created_events}")
