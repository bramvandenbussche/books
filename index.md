---
layout: default
permalink: /
---

# Bram reads books

hello world!

<section id="reviews">
    {% for review in site.data.reviews %}
        <div class="review">
            <h1>{% review.title %}</h1>
        </div>
    {% endfor %}
</section>