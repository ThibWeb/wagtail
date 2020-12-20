https://www.sphinx-doc.org/en/master/usage/restructuredtext/directives.html

Heading level 1
===============

Heading level 2
---------------

.. _Amazon Elasticsearch Service: https://aws.amazon.com/elasticsearch-service/

* List items
* External links `AMP <https://amp.dev/>`_
* Doc link :doc:`StreamField <../../topics/streamfield>`
* Ref link :ref:`Content modeling <content_modeling>`
* Reference style links 2 `Amazon Elasticsearch Service`_
* Inline code ``serve()``

Code blocks

.. code-block:: python

    # <project>/urls.py

    urlpatterns += [
        # Add this line just before the default ``include(wagtail_urls)`` line
        path('amp/', include(wagtail_urls)),

        path('', include(wagtail_urls)),
    ]

Used languages:

* ``python``
* ``html+django``
* ``console``
* ``scss``
* ``html``
* ``text``
* ``html+jinja``
* ``html+Django``
* ``json``
* ``javascript``
* ``shell``
* ``bash``
* ``css``
* ``django``
* ``HTML+Django``
* ``sh``

Admonitions
---------------

.. note:: Used 63 times in docs

    (feel free to skip this part if you're not interested)

.. important::
    important Used 2 times in docs

.. warning::
    warning Used 14 times

.. topic:: Topic Used 6 times

    By default, ``MultiFieldPanel``

.. tip::

    tip Used 3 times

``toctree`` used 24 times

.. glossary::

  glossary used 8 times, maps to dl, dt, dd
    Feature releases (A.B, A.B+1, etc.) happen every three months
    -- see `release process <#release-process>`__ for details. These releases will contain new
    features and improvements to existing features.

  Patch release
    Patch releases (A.B.C, A.B.C+1, etc.) will be issued as needed, to fix
    bugs and/or security issues.

contents used in release notes and 10 times
-------------------------------------------

.. contents::
    :local:
    :depth: 1

versionadded 6 times

.. versionadded:: 2.11

versionchanged 3 times

.. versionchanged:: 2.11

comments 3 times(?)

.. NEED TO ADD IN DETAILS ABOUT SNIPPETS HERE

.. figure:: ../_static/images/tutorial/tutorial_2.png
   :alt: Administrative screen

.. image:: ../_static/images/screen12_edit_screen_overview.png






.. register_page_listing_more_buttons:

.. module::
.. autofunction::
.. class::
.. automodule::
.. method::
.. attribute::
.. autoclass::
.. currentmodule::

Table
-----

=============  =============  =============
Browser        Device/OS      Version(s)
=============  =============  =============
Mobile Safari  iOS Phone      Last 2
Mobile Safari  iOS Tablet     Last 2
Firefox ESR    Desktop        Latest
Safari         macOS          Last 2
=============  =============  =============
